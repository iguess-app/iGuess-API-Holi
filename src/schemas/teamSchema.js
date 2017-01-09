'use strict';

const mongoose = require('mongoose');

module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const teamSchema = new Schema({
      league: {
        type: String,
        required: true
      },
      fullName: {
        type: String,
        required: true
      },
      shortName: {
        type: String,
        required: true
      },
      logo: {
        type: String,
        required: true
      }
  })

  return db.model('teams', teamSchema);
}