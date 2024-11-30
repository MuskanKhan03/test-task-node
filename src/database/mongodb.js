const mongoose = require('mongoose');
const { APIError } = require('../utils/error');

async function initializeDB() {
  try {
    const mongoDBUrl = process.env.MONGO_DB_URL;

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection successful');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      throw new APIError(500, 'MongoDB connection error', null, err.stack);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB connection reconnected');
    });

    return await mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 25,
      maxPoolSize: 25,
    });
  } catch (err) {
    console.error('Error in connection of mongodb', err);
    throw new APIError(500, err?.message, null, err?.stack);
  }
}

module.exports = {
  initializeDB,
};
