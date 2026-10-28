-- ==========================================================
-- Database: crochet
-- Schema & Initial Seed Data for Cozy Stitches Store
-- ==========================================================

CREATE DATABASE IF NOT EXISTS crochet;
USE crochet;

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  total_spent DECIMAL(10, 2) DEFAULT 0.00,
  orders_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_order_at TIMESTAMP NULL
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  skill VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NULL,
  file_name VARCHAR(255) NOT NULL,
  download_name VARCHAR(255) NOT NULL,
  pages INT,
  sales_count INT DEFAULT 0,
  is_active TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(100) NOT NULL UNIQUE,
  customer_id INT NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'paid',
  payment_method VARCHAR(50) DEFAULT 'card',
  currency VARCHAR(10) DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(100) NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 5. Download Tokens (Anti-Piracy Protected Access)
CREATE TABLE IF NOT EXISTS download_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(100) NOT NULL,
  product_id INT NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  download_name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  max_downloads INT DEFAULT 5,
  download_count INT DEFAULT 0,
  expires_at BIGINT NOT NULL,
  is_revoked TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 6. Download Audit Logs
CREATE TABLE IF NOT EXISTS download_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  order_id VARCHAR(100) NOT NULL,
  product_id INT NOT NULL,
  ip_address VARCHAR(100),
  user_agent TEXT,
  status VARCHAR(50) DEFAULT 'success',
  downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Newsletter & Freebie Subscribers (Leads)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100) DEFAULT 'freebie_signup',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- Initial Data Seeding
-- ==========================================================

INSERT INTO products (id, name, category, skill, price, original_price, file_name, download_name, pages, sales_count)
VALUES
  (1, 'Sus Space Crewmate', 'amigurumi', 'intermediate', 4.99, 7.99, 'pattern-1-sus-space-crewmate.pdf', 'Sus-Space-Crewmate-Amigurumi-Pattern.pdf', 5, 148),
  (2, 'Shooting Star Keychain', 'pdf-pattern', 'beginner', 4.49, 6.99, 'pattern-2-shooting-star-keychain.pdf', 'Shooting-Star-Keychain-Pattern.pdf', 6, 168),
  (3, 'Eyeglass Holder Set 2', 'pdf-pattern', 'intermediate', 7.99, 14.99, 'pattern-3-eyeglass-holder-set-2.pdf', 'Eyeglass-Holder-Set-2-Pattern.pdf', 13, 284)
ON DUPLICATE KEY UPDATE name=VALUES(name), price=VALUES(price);

-- Sample customer
INSERT INTO customers (id, email, name, total_spent, orders_count)
VALUES (1, 'ouchahbounhoussame@gmail.com', 'Houssame Ouchahboun', 17.47, 2)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Sample orders
INSERT INTO orders (order_id, customer_id, customer_email, customer_name, total_amount, payment_status, payment_method)
VALUES ('ORD-CROCHET-001', 1, 'ouchahbounhoussame@gmail.com', 'Houssame Ouchahboun', 17.47, 'paid', 'credit_card')
ON DUPLICATE KEY UPDATE total_amount=VALUES(total_amount);

INSERT INTO order_items (order_id, product_id, product_name, unit_price)
VALUES 
  ('ORD-CROCHET-001', 1, 'Sus Space Crewmate', 4.99),
  ('ORD-CROCHET-001', 2, 'Shooting Star Keychain', 4.49),
  ('ORD-CROCHET-001', 3, 'Eyeglass Holder Set 2', 7.99);
