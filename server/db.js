import Database from 'better-sqlite3';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IS_VERCEL = Boolean(process.env.VERCEL);
const DATA_DIR = IS_VERCEL ? path.join('/tmp', 'crochet_data') : path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'store.db');

export function resolveStorageDir() {
  const candidates = [
    path.join(__dirname, 'storage', 'patterns'),
    path.join(process.cwd(), 'server', 'storage', 'patterns'),
    path.join(process.cwd(), 'crochet-store-react', 'server', 'storage', 'patterns'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}
export const STORAGE_DIR = resolveStorageDir();

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize SQLite database
export const db = new Database(DB_PATH);

// Configure database pragmas
if (IS_VERCEL) {
  db.pragma('journal_mode = DELETE');
} else {
  db.pragma('journal_mode = WAL');
}
db.pragma('foreign_keys = ON');

// ── SQL Schema Initialization ──────────────────────────────
export function initSchema() {
  db.exec(`
    -- 1. Customers Table
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      name TEXT,
      total_spent REAL DEFAULT 0.0,
      orders_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_order_at DATETIME
    );

    -- 2. Products Table
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      skill TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      file_name TEXT NOT NULL,
      download_name TEXT NOT NULL,
      pages INTEGER,
      sales_count INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. Orders Table
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT UNIQUE NOT NULL,
      customer_id INTEGER NOT NULL,
      customer_email TEXT NOT NULL COLLATE NOCASE,
      customer_name TEXT,
      total_amount REAL NOT NULL,
      payment_status TEXT DEFAULT 'paid',
      payment_method TEXT DEFAULT 'card',
      currency TEXT DEFAULT 'USD',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );

    -- 4. Order Items Table
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      unit_price REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    -- 5. Download Access Tokens (Anti-piracy)
    CREATE TABLE IF NOT EXISTS download_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      download_name TEXT NOT NULL,
      file_name TEXT NOT NULL,
      max_downloads INTEGER DEFAULT 5,
      download_count INTEGER DEFAULT 0,
      expires_at INTEGER NOT NULL,
      is_revoked INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    -- 6. Download Audit Logs
    CREATE TABLE IF NOT EXISTS download_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL,
      order_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      status TEXT DEFAULT 'success',
      downloaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 7. Newsletter & Freebie Subscribers (Leads)
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      source TEXT DEFAULT 'freebie_signup',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create indexes for performance
    CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
    CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
    CREATE INDEX IF NOT EXISTS idx_tokens_token ON download_tokens(token);
    CREATE INDEX IF NOT EXISTS idx_tokens_order_id ON download_tokens(order_id);
  `);

  // Seed or sync default products
  const insertProduct = db.prepare(`
    INSERT OR IGNORE INTO products (id, name, category, skill, price, original_price, file_name, download_name, pages)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const productsSeed = [
    [1, "Sus Space Crewmate", "amigurumi", "intermediate", 4.99, 7.99, "pattern-1-sus-space-crewmate.pdf", "Sus-Space-Crewmate-Amigurumi-Pattern.pdf", 6],
    [2, "Shooting Star Keychain", "pdf-pattern", "beginner", 4.49, 6.99, "pattern-2-shooting-star-keychain.pdf", "Shooting-Star-Keychain-Pattern.pdf", 6],
    [3, "Eyeglass Holder Set 2", "pdf-pattern", "intermediate", 7.99, 14.99, "pattern-3-eyeglass-holder-set-2.pdf", "Eyeglass-Holder-Set-2-Pattern.pdf", 13],
    [4, "Graduate Doll Amigurumi", "amigurumi", "intermediate", 6.99, 11.99, "pattern-4-graduate-doll.pdf", "Graduate-Doll-Amigurumi-Pattern.pdf", 11]
  ];

  for (const p of productsSeed) {
    insertProduct.run(...p);
  }
}

// Run schema on startup
initSchema();

// ── Database Operations ────────────────────────────────────

export function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function getAllProducts() {
  return db.prepare('SELECT id, name, category, skill, price, original_price, pages, sales_count FROM products WHERE is_active = 1').all();
}

export function getProductById(id) {
  return db.prepare('SELECT id, name, category, skill, price, original_price, pages, sales_count FROM products WHERE id = ? AND is_active = 1').get(id);
}

// Atomic Transaction to create customer, order, items, and download tokens
export const createOrder = db.transaction(({ email, name, items, paymentMethod = 'card' }) => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name?.trim() || 'Valued Customer';

  // 1. Get or create Customer
  let customer = db.prepare('SELECT * FROM customers WHERE email = ?').get(cleanEmail);
  if (!customer) {
    const res = db.prepare('INSERT INTO customers (email, name) VALUES (?, ?)').run(cleanEmail, cleanName);
    customer = { id: res.lastInsertRowid, email: cleanEmail, name: cleanName, total_spent: 0, orders_count: 0 };
  } else if (cleanName && customer.name === 'Valued Customer') {
    db.prepare('UPDATE customers SET name = ? WHERE id = ?').run(cleanName, customer.id);
  }

  // 2. Validate Items & calculate total
  const validatedItems = [];
  let total = 0;

  for (const item of items) {
    const prod = db.prepare('SELECT * FROM products WHERE id = ? AND is_active = 1').get(Number(item.id));
    if (prod) {
      validatedItems.push(prod);
      total += prod.price;
    }
  }

  if (validatedItems.length === 0) {
    throw new Error('No valid products selected.');
  }

  total = Math.round(total * 100) / 100;

  // 3. Generate Order ID
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // 4. Insert Order
  db.prepare(`
    INSERT INTO orders (order_id, customer_id, customer_email, customer_name, total_amount, payment_status, payment_method)
    VALUES (?, ?, ?, ?, ?, 'paid', ?)
  `).run(orderId, customer.id, cleanEmail, cleanName, total, paymentMethod);

  // 5. Update Customer stats
  db.prepare(`
    UPDATE customers 
    SET total_spent = total_spent + ?, orders_count = orders_count + 1, last_order_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(total, customer.id);

  // 6. Insert Order Items & generate Download Tokens
  const insertItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, product_name, unit_price)
    VALUES (?, ?, ?, ?)
  `);

  const insertToken = db.prepare(`
    INSERT INTO download_tokens (order_id, product_id, token, download_name, file_name, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const updateProductSales = db.prepare(`
    UPDATE products SET sales_count = sales_count + 1 WHERE id = ?
  `);

  const now = Date.now();
  const expiresAt = now + 48 * 60 * 60 * 1000; // 48 hours
  const downloads = [];

  for (const prod of validatedItems) {
    insertItem.run(orderId, prod.id, prod.name, prod.price);
    updateProductSales.run(prod.id);

    const token = generateSecureToken();
    insertToken.run(orderId, prod.id, token, prod.download_name, prod.file_name, expiresAt);

    downloads.push({
      productId: prod.id,
      productName: prod.name,
      downloadName: prod.download_name,
      downloadUrl: `/api/downloads/${token}`,
      expiresAt,
      maxDownloads: 5,
      downloadCount: 0
    });
  }

  return {
    orderId,
    customerEmail: cleanEmail,
    customerName: cleanName,
    total,
    status: 'paid',
    items: validatedItems.map(p => ({ id: p.id, name: p.name, price: p.price, pages: p.pages })),
    downloads
  };
});

// Find download by token
export function findDownloadByToken(token) {
  return db.prepare(`
    SELECT dt.*, o.customer_email, o.customer_name, o.payment_status
    FROM download_tokens dt
    JOIN orders o ON o.order_id = dt.order_id
    WHERE dt.token = ? AND dt.is_revoked = 0
  `).get(token);
}

// Record download log and increment counter
export const recordDownload = db.transaction((token, ipAddress, userAgent) => {
  const dt = db.prepare('SELECT * FROM download_tokens WHERE token = ?').get(token);
  if (!dt) return null;

  db.prepare('UPDATE download_tokens SET download_count = download_count + 1 WHERE token = ?').run(token);
  db.prepare(`
    INSERT INTO download_logs (token, order_id, product_id, ip_address, user_agent, status)
    VALUES (?, ?, ?, ?, ?, 'success')
  `).run(token, dt.order_id, dt.product_id, ipAddress || 'unknown', userAgent || 'unknown');

  return { ...dt, download_count: dt.download_count + 1 };
});

// Refresh tokens for order
export const refreshOrderTokens = db.transaction((orderId, email) => {
  const order = db.prepare('SELECT * FROM orders WHERE order_id = ? AND customer_email = ?').get(
    orderId.trim().toUpperCase(),
    email.trim().toLowerCase()
  );

  if (!order) return null;

  const now = Date.now();
  const expiresAt = now + 48 * 60 * 60 * 1000;

  // Revoke old tokens
  db.prepare('UPDATE download_tokens SET is_revoked = 1 WHERE order_id = ?').run(order.order_id);

  // Re-generate fresh tokens for each product in order
  const items = db.prepare('SELECT oi.*, p.download_name, p.file_name FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = ?').all(order.order_id);

  const insertToken = db.prepare(`
    INSERT INTO download_tokens (order_id, product_id, token, download_name, file_name, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const downloads = [];
  for (const item of items) {
    const token = generateSecureToken();
    insertToken.run(order.order_id, item.product_id, token, item.download_name, item.file_name, expiresAt);
    downloads.push({
      productId: item.product_id,
      productName: item.product_name,
      downloadName: item.download_name,
      downloadUrl: `/api/downloads/${token}`,
      expiresAt,
      maxDownloads: 5,
      downloadCount: 0
    });
  }

  return downloads;
});

// Get Order Details
export function getOrderDetails(orderId) {
  const order = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(orderId.trim().toUpperCase());
  if (!order) return null;

  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.order_id);
  const tokens = db.prepare('SELECT * FROM download_tokens WHERE order_id = ? AND is_revoked = 0').all(order.order_id);

  const now = Date.now();
  const downloads = tokens.map(t => ({
    productId: t.product_id,
    downloadName: t.download_name,
    downloadUrl: `/api/downloads/${t.token}`,
    expiresAt: t.expires_at,
    maxDownloads: t.max_downloads,
    downloadCount: t.download_count,
    isExpired: now > t.expires_at,
    isLimitReached: t.download_count >= t.max_downloads
  }));

  return { ...order, items, downloads };
}

// Newsletter subscriber
export function addSubscriber(email, source = 'freebie_signup') {
  const cleanEmail = email.trim().toLowerCase();
  const existing = db.prepare('SELECT * FROM newsletter_subscribers WHERE email = ?').get(cleanEmail);
  if (existing) return existing;

  const res = db.prepare('INSERT INTO newsletter_subscribers (email, source) VALUES (?, ?)').run(cleanEmail, source);
  return { id: res.lastInsertRowid, email: cleanEmail, source };
}

// Grant Freebie Download Token for a free pattern (default: Shooting Star Keychain id=2)
export const grantFreebieDownload = db.transaction((email, productId = 2) => {
  const cleanEmail = email.trim().toLowerCase();
  let customer = db.prepare('SELECT * FROM customers WHERE email = ?').get(cleanEmail);
  if (!customer) {
    const res = db.prepare('INSERT INTO customers (email, name) VALUES (?, ?)').run(cleanEmail, 'Freebie Subscriber');
    customer = { id: res.lastInsertRowid, email: cleanEmail, name: 'Freebie Subscriber', total_spent: 0, orders_count: 0 };
  }

  const prod = db.prepare('SELECT * FROM products WHERE id = ?').get(Number(productId));
  if (!prod) throw new Error('Product not found');

  const orderId = `FREE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  db.prepare(`
    INSERT INTO orders (order_id, customer_id, customer_email, customer_name, total_amount, payment_status, payment_method)
    VALUES (?, ?, ?, ?, 0.00, 'paid', 'freebie')
  `).run(orderId, customer.id, cleanEmail, customer.name);

  db.prepare(`
    INSERT INTO order_items (order_id, product_id, product_name, unit_price)
    VALUES (?, ?, ?, 0.00)
  `).run(orderId, prod.id, prod.name);

  const token = generateSecureToken();
  const now = Date.now();
  const expiresAt = now + 48 * 60 * 60 * 1000;

  db.prepare(`
    INSERT INTO download_tokens (order_id, product_id, token, download_name, file_name, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(orderId, prod.id, token, prod.download_name, prod.file_name, expiresAt);

  return {
    orderId,
    productId: prod.id,
    productName: prod.name,
    downloadName: prod.download_name,
    downloadUrl: `/api/downloads/${token}`,
    expiresAt
  };
});

// ── Admin SQL Overview ─────────────────────────────────────
export function getAdminOverview() {
  const totalRevenue = db.prepare("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE payment_status = 'paid'").get().total;
  const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
  const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM customers').get().count;
  const totalSubscribers = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers').get().count;

  const recentOrders = db.prepare(`
    SELECT o.order_id, o.customer_email, o.customer_name, o.total_amount, o.payment_status, o.created_at,
           GROUP_CONCAT(oi.product_name, ', ') as items
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.order_id
    GROUP BY o.order_id
    ORDER BY o.created_at DESC
    LIMIT 25
  `).all();

  const customersList = db.prepare(`
    SELECT id, email, name, total_spent, orders_count, created_at, last_order_at
    FROM customers
    ORDER BY total_spent DESC
    LIMIT 50
  `).all();

  const recentLogs = db.prepare(`
    SELECT dl.*, p.name as product_name
    FROM download_logs dl
    JOIN products p ON p.id = dl.product_id
    ORDER BY dl.downloaded_at DESC
    LIMIT 25
  `).all();

  return {
    metrics: {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders,
      totalCustomers,
      totalSubscribers
    },
    recentOrders,
    customersList,
    recentLogs
  };
}
