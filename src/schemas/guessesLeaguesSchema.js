'use strict';

const mongoose = require('mongoose');

module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const guessesLeaguesSchema = new Schema({
    _id: {
      type: String,
      required: true
    },
    administrator: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    players: {
      type: Array,
      required: true
    }
  })

  return db.model('guessesleagues', guessesLeaguesSchema);
}