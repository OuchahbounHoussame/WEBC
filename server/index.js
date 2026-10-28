import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import downloadsRoutes from './routes/downloads.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;

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
    database: 'SQLite 3 (better-sqlite3) WAL active',
    service: 'Crochet Digital Patterns Backend',
    timestamp: new Date().toISOString()
  });
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🧶 Crochet Store Backend running on:`);
  console.log(`   Local API:  http://localhost:${PORT}`);
  console.log(`   Admin SQL:  http://localhost:${PORT}/admin`);
  console.log(`   Network:    http://0.0.0.0:${PORT}`);
  console.log(`💾 SQL Database: server/data/store.db`);
  console.log(`🔒 Protected PDF Storage: server/storage/patterns`);
  console.log(`===============================================`);
});
