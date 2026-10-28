import express from 'express';
import { getAdminOverview, db } from '../db.js';

const router = express.Router();

// GET /api/admin/overview (JSON API)
router.get('/overview', (req, res) => {
  try {
    const data = getAdminOverview();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /admin (Visual Admin Dashboard)
router.get('/', (req, res) => {
  try {
    const { metrics, recentOrders, customersList, recentLogs } = getAdminOverview();
    const subscribers = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 50').all();

    res.type('html').send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Store SQL Database &amp; Orders Admin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f8f6fb;
      --card-bg: #ffffff;
      --primary: #cf6a84;
      --primary-soft: #fdf0f4;
      --accent: #54b895;
      --text: #2f1d33;
      --text-muted: #826c88;
      --border: #eedef2;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 30px 20px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 25px; flex-wrap: wrap; gap: 15px;
    }
    .header h1 { font-size: 1.7rem; color: #3d2442; }
    .header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }
    .badge-sql {
      background: #eef2ff; color: #4338ca; font-weight: 700;
      padding: 6px 14px; border-radius: 50px; font-size: 0.8rem;
      border: 1px solid #c7d2fe;
    }
    .metrics-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px; margin-bottom: 30px;
    }
    .metric-card {
      background: var(--card-bg); padding: 20px; border-radius: 16px;
      border: 1px solid var(--border); box-shadow: 0 4px 14px rgba(130, 70, 130, 0.05);
    }
    .metric-card span { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
    .metric-card strong { font-size: 1.8rem; color: var(--primary); display: block; margin-top: 6px; }

    .section-card {
      background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border);
      box-shadow: 0 4px 14px rgba(130, 70, 130, 0.05); margin-bottom: 30px;
      overflow: hidden;
    }
    .sc-header {
      padding: 18px 24px; border-bottom: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .sc-header h2 { font-size: 1.15rem; color: #3d2442; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem; }
    th {
      background: #faf7fc; color: var(--text-muted); font-weight: 700;
      padding: 12px 18px; border-bottom: 1px solid var(--border);
      font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px;
    }
    td { padding: 14px 18px; border-bottom: 1px solid #f6edf8; color: #432b47; }
    tr:hover td { background: #fdfafc; }
    .pill-paid {
      background: #eaf7f2; color: #2e8b6b; font-weight: 700;
      padding: 3px 10px; border-radius: 50px; font-size: 0.72rem;
    }
    .order-link { color: var(--primary); font-weight: 700; text-decoration: none; }
    .btn-refresh {
      background: var(--primary); color: white; border: none; padding: 8px 16px;
      border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none;
      display: inline-block; font-size: 0.85rem;
    }
    .empty-state { padding: 30px; text-align: center; color: var(--text-muted); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>🧶 Crochet Store SQL Database Admin</h1>
        <p>Live Relational Database (SQLite) • Real-time Orders, Customer Mails, and Download Logs</p>
      </div>
      <div>
        <span class="badge-sql">⚡ SQLite Engine Active</span>
        <a href="/admin" class="btn-refresh" style="margin-left: 10px;">↻ Refresh Data</a>
        <a href="/" class="btn-refresh" style="background: #3d2442; margin-left: 6px;">← Back to Store</a>
      </div>
    </div>

    <!-- KPIs -->
    <div class="metrics-grid">
      <div class="metric-card">
        <span>Total Revenue</span>
        <strong>$${metrics.totalRevenue.toFixed(2)}</strong>
      </div>
      <div class="metric-card">
        <span>Total Orders</span>
        <strong>${metrics.totalOrders}</strong>
      </div>
      <div class="metric-card">
        <span>Paying Customers</span>
        <strong>${metrics.totalCustomers}</strong>
      </div>
      <div class="metric-card">
        <span>Freebie Leads</span>
        <strong>${metrics.totalSubscribers}</strong>
      </div>
    </div>

    <!-- 1. Orders Table -->
    <div class="section-card">
      <div class="sc-header">
        <h2>📦 Orders Table (SQL: <code>orders</code> &amp; <code>order_items</code>)</h2>
        <span style="font-size:0.82rem; color:var(--text-muted);">${recentOrders.length} recent orders</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Email</th>
              <th>Name</th>
              <th>Items Purchased</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date (UTC)</th>
            </tr>
          </thead>
          <tbody>
            ${recentOrders.length > 0 ? recentOrders.map(o => `
              <tr>
                <td><span class="order-link">${o.order_id}</span></td>
                <td><strong>${o.customer_email}</strong></td>
                <td>${o.customer_name || 'Customer'}</td>
                <td>${o.items || 'Pattern'}</td>
                <td><strong>$${o.total_amount.toFixed(2)}</strong></td>
                <td><span class="pill-paid">${o.payment_status}</span></td>
                <td>${new Date(o.created_at).toLocaleString()}</td>
              </tr>
            `).join('') : `
              <tr><td colspan="7" class="empty-state">No orders yet. Place a test order in the store to see it populate here instantly!</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 2. Customers / Emails List -->
    <div class="section-card">
      <div class="sc-header">
        <h2>👤 Customers &amp; Emails (SQL: <code>customers</code>)</h2>
        <span style="font-size:0.82rem; color:var(--text-muted);">${customersList.length} customers</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email Address</th>
              <th>Customer Name</th>
              <th>Total Spent</th>
              <th>Total Orders</th>
              <th>First Joined</th>
              <th>Last Purchase</th>
            </tr>
          </thead>
          <tbody>
            ${customersList.length > 0 ? customersList.map(c => `
              <tr>
                <td>#${c.id}</td>
                <td><strong>${c.email}</strong></td>
                <td>${c.name || 'Valued Customer'}</td>
                <td>$${c.total_spent.toFixed(2)}</td>
                <td>${c.orders_count}</td>
                <td>${new Date(c.created_at).toLocaleDateString()}</td>
                <td>${c.last_order_at ? new Date(c.last_order_at).toLocaleDateString() : '-'}</td>
              </tr>
            `).join('') : `
              <tr><td colspan="7" class="empty-state">No customers recorded yet.</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 3. Download Audit Logs -->
    <div class="section-card">
      <div class="sc-header">
        <h2>🛡️ Download Security Logs (SQL: <code>download_logs</code>)</h2>
        <span style="font-size:0.82rem; color:var(--text-muted);">IP &amp; anti-piracy audit</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Order ID</th>
              <th>Client IP</th>
              <th>User Agent</th>
              <th>Status</th>
              <th>Downloaded At</th>
            </tr>
          </thead>
          <tbody>
            ${recentLogs.length > 0 ? recentLogs.map(l => `
              <tr>
                <td><strong>${l.product_name}</strong></td>
                <td>${l.order_id}</td>
                <td><code>${l.ip_address}</code></td>
                <td style="max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${l.user_agent}</td>
                <td><span class="pill-paid">${l.status}</span></td>
                <td>${new Date(l.downloaded_at).toLocaleString()}</td>
              </tr>
            `).join('') : `
              <tr><td colspan="6" class="empty-state">No pattern downloads streamed yet.</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

    <!-- 4. Newsletter Leads -->
    <div class="section-card">
      <div class="sc-header">
        <h2>💌 Freebie &amp; Newsletter Leads (SQL: <code>newsletter_subscribers</code>)</h2>
        <span style="font-size:0.82rem; color:var(--text-muted);">${subscribers.length} emails collected</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Subscriber Email</th>
              <th>Acquisition Source</th>
              <th>Signup Date</th>
            </tr>
          </thead>
          <tbody>
            ${subscribers.length > 0 ? subscribers.map(s => `
              <tr>
                <td>#${s.id}</td>
                <td><strong>${s.email}</strong></td>
                <td>${s.source}</td>
                <td>${new Date(s.created_at).toLocaleString()}</td>
              </tr>
            `).join('') : `
              <tr><td colspan="4" class="empty-state">No subscribers yet.</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>

  </div>
</body>
</html>
    `);
  } catch (err) {
    res.status(500).send('Error rendering admin dashboard: ' + err.message);
  }
});

export default router;
