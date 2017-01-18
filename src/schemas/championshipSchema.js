'use strict';

const mongoose = require('mongoose');
  
module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const championshipSchema = new Schema({
    league: {
      type: String,
      required: true
    },
    season: {
      type: String,
      required: true
    },
    championship: {
      type: String,
      required: true
    }
  })

  return db.model('championships', championshipSchema);
}