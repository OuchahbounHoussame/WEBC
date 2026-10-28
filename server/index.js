import app from './app.js';

const PORT = process.env.PORT || 5000;

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
