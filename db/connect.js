'use strict';

// Import the required modules
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI; // Load the connection string from .env
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    if (!db) {
      await client.connect(); // Establish a connection
      console.log('Connected to MongoDB!');
      db = client.db(); // Default database from the URI
    }
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function connectMongoose() {
  try {
    if (!db) {
      await mongoose.connect(uri);
      db = mongoose.connection;
      console.log('Connected to MongoDB using Mongoose!');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB using Mongoose:', error);
    throw error;
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDatabase, connectMongoose, getDb };
