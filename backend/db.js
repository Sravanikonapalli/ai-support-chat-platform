const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db('aichat');
  }
  return db;
}

module.exports = { connectDB };
