'use strict';

const { body, param, validationResult } = require('express-validator');
const contactsValidate = {};

/*************************************
 *  MongoId validation rules
 *************************************/
contactsValidate.idRules = () => {
  return [param('id').isMongoId().withMessage('Invalid ID')];
};

/*************************************
 *  Check MongoId validation
 *************************************/
contactsValidate.checkId = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

/*************************************
 *  Contact validation rules
 *************************************/
contactsValidate.contactRules = () => {
  return [
    body('firstName')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a first name.'),

    body('lastName')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('Please provide a last name.'),

    body('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required.'),

    body('favoriteColor').isString().withMessage('Favorite color must be a string'),

    body('birthday').isISO8601().withMessage('Date must be in ISO 8601 format')
  ];
};

/*************************************
 *  Contact validation check
 *************************************/
contactsValidate.checkContact = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = contactsValidate;
