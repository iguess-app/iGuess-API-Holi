'use strict';

const mongoose = require('mongoose');
  
module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const leagueSchema = new Schema({
    country: {
      type: String,
      required: true
    },
    countryInitials: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    serie: { type: Number }
  })

  return db.model('leagues', leagueSchema);
}