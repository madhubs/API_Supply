'use strict';

const mongoose = require('mongoose');

const APISupply = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  url: {type: String, required: true, unique: true  },
  desc: { type: String, required: true },
  examplesOfUse: {type: String, required: true },
  examplesInUse: {type: String, required: true },
  rating: {type: String, required: true },
  tokenRequired: {type: Boolean, required: true },
  tokenAccessWaitTime: {type: String, required: true },
  maxReqMin: {type: String, required: true },
  numUsersFav: {type: String, required: false },
  _category: {type: String, required: true },
  userId: { type:mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true });

module.exports = mongoose.model('APISupply', APISupply);
