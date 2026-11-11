import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import downloadsRoutes from './routes/downloads.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/downloads', downloadsRoutes);
app.use('/api/admin', adminRoutes);

// Visual Admin Dashboard
app.use('/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.VERCEL ? 'Vercel Serverless' : 'Node.js / Docker Server',
    service: 'Crochet Digital Patterns Backend',
    timestamp: new Date().toISOString()
  });
});

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

// Fallback SEO endpoints for sitemap.xml and robots.txt
app.get('/sitemap.xml', (req, res) => {
  const distSitemap = path.join(distPath, 'sitemap.xml');
  const pubSitemap = path.resolve(__dirname, '../public/sitemap.xml');
  const target = fs.existsSync(distSitemap) ? distSitemap : pubSitemap;
  if (fs.existsSync(target)) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.sendFile(target);
  }
  res.status(404).send('Sitemap not found');
});

app.get('/robots.txt', (req, res) => {
  const distRobots = path.join(distPath, 'robots.txt');
  const pubRobots = path.resolve(__dirname, '../public/robots.txt');
  const target = fs.existsSync(distRobots) ? distRobots : pubRobots;
  if (fs.existsSync(target)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.sendFile(target);
  }
  res.status(404).send('robots.txt not found');
});

// Serve frontend in production / Docker mode if dist folder exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

export default app;
