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

// Serve frontend in production / Docker mode if dist folder exists
const distPath = path.join(process.cwd(), 'dist');
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
