const express = require('express');
const router = express.Router();

const {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactsController');

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
router.get('/', getContacts);

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
router.post('/', createContact);

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
router.put('/:id', updateContact);

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
router.delete('/:id', deleteContact);


module.exports = router;
