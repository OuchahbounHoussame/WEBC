import express from 'express';
import crypto from 'crypto';
import { getAdminOverview, db } from '../db.js';

const router = express.Router();

// Admin password (can be customized via environment variable)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'crochet2026';
const AUTH_SECRET = process.env.AUTH_SECRET || 'crochet-super-secret-salt-2026';

// Compute auth signature for verification
function getExpectedToken() {
  return crypto.createHmac('sha256', AUTH_SECRET).update(ADMIN_PASSWORD).digest('hex');
}

// Helper to parse cookies from headers
function getCookie(req, name) {
  const match = req.headers.cookie?.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// Middleware to check authentication
function isAuth(req) {
  const token = getCookie(req, 'crochet_admin_auth') || req.headers['x-admin-key'] || req.query.key;
  return token === getExpectedToken() || token === ADMIN_PASSWORD;
}

// ── Login / Logout Routes ──────────────────────────────────

// POST /admin/login (or /api/admin/login)
router.post('/login', (req, res) => {
  const { password } = req.body || {};
  if (!password || password.trim() !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect admin password. Please try again.'
    });
  }

  const token = getExpectedToken();
  // 7 days cookie
  res.setHeader(
    'Set-Cookie',
    `crochet_admin_auth=${token}; Path=/; Max-Age=604800; SameSite=Lax; HttpOnly`
  );

  res.json({
    success: true,
    message: 'Authentication successful'
  });
});

// GET /admin/logout
router.get('/logout', (req, res) => {
  res.setHeader(
    'Set-Cookie',
    'crochet_admin_auth=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly'
  );
  res.redirect('/admin');
});

// GET /admin/export-csv
router.get('/export-csv', (req, res) => {
  if (!isAuth(req)) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const orders = db.prepare(`
      SELECT o.order_id, o.customer_email, o.customer_name, o.total_amount, o.payment_status, o.created_at,
             GROUP_CONCAT(oi.product_name, ' | ') as items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.order_id
      GROUP BY o.order_id
      ORDER BY o.created_at DESC
    `).all();

    let csv = 'Order ID,Customer Email,Customer Name,Items,Total (USD),Payment Status,Date (UTC)\n';
    for (const o of orders) {
      csv += `"${o.order_id}","${o.customer_email}","${o.customer_name || ''}","${o.items || ''}","${o.total_amount}","${o.payment_status}","${o.created_at}"\n`;
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="crochet-store-orders-${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) {
    res.status(500).send('Error exporting CSV: ' + err.message);
  }
});

// GET /api/admin/overview (Protected JSON API)
router.get('/overview', (req, res) => {
  if (!isAuth(req)) {
    return res.status(401).json({ success: false, message: 'Admin authentication required' });
  }
  try {
    const data = getAdminOverview();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /admin (Protected Visual Admin Dashboard or Login Form)
router.get('/', (req, res) => {
  // If not authenticated, render the stylish pastel Login screen
  if (!isAuth(req)) {
    return res.type('html').send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Admin Login • Cozy Stitches</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #fcf9fb;
      --card: #ffffff;
      --primary: #cf6a84;
      --primary-hover: #b8506d;
      --border: #eddcf4;
      --text: #3d2442;
      --muted: #8a7392;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .login-card {
      background: var(--card);
      border: 1.5px solid var(--border);
      border-radius: 22px;
      padding: 40px 32px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 10px 35px rgba(130, 70, 130, 0.08);
      text-align: center;
    }
    .icon-lock {
      width: 60px; height: 60px;
      background: #fdf0f4;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 18px;
      color: var(--primary);
    }
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      margin-bottom: 6px;
      color: var(--text);
    }
    p {
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.5;
      margin-bottom: 26px;
    }
    .input-wrap {
      margin-bottom: 18px;
      text-align: left;
    }
    label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 6px;
    }
    input {
      width: 100%;
      padding: 13px 16px;
      border-radius: 12px;
      border: 1.5px solid var(--border);
      font-family: inherit;
      font-size: 0.95rem;
      color: var(--text);
      outline: none;
      transition: all 0.2s;
    }
    input:focus {
      border-color: #9d7dc5;
      box-shadow: 0 0 0 3px rgba(157, 125, 197, 0.18);
    }
    .error-msg {
      background: #fdf0f2;
      border: 1px solid #f6c8d0;
      color: #c93b54;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 0.82rem;
      margin-bottom: 16px;
      display: none;
    }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #e8829b 0%, #cf6a84 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s;
      box-shadow: 0 6px 18px rgba(207, 106, 132, 0.35);
    }
    button:hover {
      background: linear-gradient(135deg, #cf6a84 0%, #b8506d 100%);
      transform: translateY(-1px);
    }
    .back-link {
      display: inline-block;
      margin-top: 18px;
      color: var(--muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
    }
    .back-link:hover { color: var(--primary); }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="icon-lock">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </div>
    <h1>Store Admin Access</h1>
    <p>Please enter your secure admin password to access the database and live sales dashboard.</p>

    <div id="error" class="error-msg"></div>

    <form id="loginForm">
      <div class="input-wrap">
        <label for="pwd">Admin Password</label>
        <input type="password" id="pwd" placeholder="Enter password" required autofocus />
      </div>
      <button type="submit" id="submitBtn">Unlock Dashboard</button>
    </form>

    <a href="/" class="back-link">← Return to Store</a>
  </div>

  <script>
    const form = document.getElementById('loginForm');
    const pwdInput = document.getElementById('pwd');
    const errorBox = document.getElementById('error');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBox.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying...';

      try {
        const res = await fetch('/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pwdInput.value })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          window.location.reload();
        } else {
          errorBox.textContent = data.message || 'Incorrect password';
          errorBox.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Unlock Dashboard';
        }
      } catch (err) {
        errorBox.textContent = 'Connection error. Please try again.';
        errorBox.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Unlock Dashboard';
      }
    });
  </script>
</body>
</html>
    `);
  }

  // ── Authenticated View: Full Admin Dashboard ──────────────
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
    .btn-action {
      background: var(--primary); color: white; border: none; padding: 8px 16px;
      border-radius: 50px; font-weight: 700; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem;
      transition: all 0.2s;
    }
    .btn-action:hover { opacity: 0.9; transform: translateY(-1px); }
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
      flex-wrap: wrap; gap: 10px;
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
    .empty-state { padding: 30px; text-align: center; color: var(--text-muted); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>🧶 Crochet Store SQL Database Admin</h1>
        <p>🔒 Authenticated Session • Live Orders, Customer Mails, and Download Logs</p>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span class="badge-sql">⚡ SQLite Engine Active</span>
        <a href="/admin/export-csv" class="btn-action" style="background: #2e8b6b;">📥 Export CSV</a>
        <a href="/admin" class="btn-action">↻ Refresh</a>
        <a href="/" class="btn-action" style="background: #3d2442;">← Store</a>
        <a href="/admin/logout" class="btn-action" style="background: #9d3d52;" title="Sign out of admin session">Logout</a>
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
