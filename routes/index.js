'use strict';

const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get(
  '/api-docs',
  swaggerUi.setup(swaggerDocument)
  // #swagger.ignore = true
);

// Mount a sub-router to handle all routes under /contacts
router.use('/contacts', require('./contacts'));

module.exports = router;
