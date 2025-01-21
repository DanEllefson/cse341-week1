'use strict';

const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const Contacts = require('../models/Post');

const getAll = async (_req, res) => {
  const result = await mongodb.getDb().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, _next) => {
  let userId;
  try {
    userId = new ObjectId(req.params.id); // Convert the id to ObjectId
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format', error: err.message }); // Handle invalid ObjectId and send error message
    return;
  }

  const result = await mongodb.getDb().collection('contacts').find({ _id: userId });

  result.toArray().then((lists) => {
    if (lists.length === 0) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]); // Return the first matched document
    }
  });
};

const createSingle = async (req, res) => {
  const contact = new Contacts({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  });

  contact.save().then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result._id);
  });
};

module.exports = { getAll, getSingle, createSingle };
