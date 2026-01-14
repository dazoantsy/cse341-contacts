const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    app.locals.db = client.db("contactsDB");
  } catch (err) {
    console.error(err);
  }
}

connectDB();

app.use('/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
