const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection('contacts');

    // GET one (query parameter ?id=...)
    if (req.query.id) {
      const contact = await collection.findOne({ _id: new ObjectId(req.query.id) });
      return res.json(contact);
    }

    // GET all
    const contacts = await collection.find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
