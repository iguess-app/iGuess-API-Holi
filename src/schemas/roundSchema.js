'use strict';

const mongoose = require('mongoose');
  
module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const roundSchema = new Schema({
    championship: {
      type: String,
      required: true
    },
    fixture: {
      type: Number,
      required: true
    },
    results: {
      type: Array,
      required: true
    }
  })

  return db.model('rounds', roundSchema);
}