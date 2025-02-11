'use strict';

// Import the required modules
const express = require('express');
const contactsController = require('../controllers/contacts');
const contactsValidate = require('../utilities/contacts-validation');
const utilities = require('../utilities/index');

// Create a new router
const router = express.Router();

// Return all contacts
router.get('/', utilities.handleErrors(contactsController.getAll));

// Return a single contact
router.get(
  '/:id',
  contactsValidate.idRules,
  contactsValidate.checkId,
  utilities.handleErrors(contactsController.getSingle)
);

// Delete a single contact
router.delete(
  '/:id',
  contactsValidate.idRules,
  contactsValidate.checkId,
  utilities.handleErrors(contactsController.deleteSingle)
);

// Create a new contact
router.post(
  '/',
  contactsValidate.contactRules,
  contactsValidate.checkContact,
  utilities.handleErrors(contactsController.createSingle)
);

// Update a single contact
router.put(
  '/:id',
  contactsValidate.idRules,
  contactsValidate.checkId,
  contactsValidate.contactRules,
  contactsValidate.checkContact,
  utilities.handleErrors(contactsController.updateSingle)
);

module.exports = router;
