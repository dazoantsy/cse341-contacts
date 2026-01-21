const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');


/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Get all contacts or one contact by query id
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: Contact id (if provided, returns one contact)
 *     responses:
 *       200:
 *         description: A list of contacts or a single contact
 *       500:
 *         description: Server error
 */

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


   /**
 * @openapi
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Created (returns the new contact id)
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */



router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const db = req.app.locals.db;
    const collection = db.collection('contacts');

    const result = await collection.insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by id
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       204:
 *         description: Updated successfully
 *       400:
 *         description: Invalid id or missing fields
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id.' });
    }

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const db = req.app.locals.db;
    const collection = db.collection('contacts');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { firstName, lastName, email, favoriteColor, birthday }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by id
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact id
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id.' });
    }

    const db = req.app.locals.db;
    const collection = db.collection('contacts');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
