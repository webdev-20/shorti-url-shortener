const mongoose = require('mongoose');
const { EXPIRY_DAYS } = require('../config');

const linkSchema = new mongoose.Schema({
  url: String,
  short: {
    type: String,
    unique: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    default: () => Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000,
  },
});

linkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Link', linkSchema);
