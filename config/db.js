const { MongoClient } = require('mongodb');

let db;

const connectDB = async (uri, dbName) => {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
};

const getDB = () => db;

module.exports = { connectDB, getDB };
