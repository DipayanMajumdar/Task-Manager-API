const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  mongoose.connection.on('connected', () => console.log('🗄️  MongoDB connected'));
  mongoose.connection.on('error', (err) => console.error('MongoDB error:', err));

  await mongoose.connect(uri, {
    autoIndex: true,
  });
}

module.exports = { connectDB };
