'use strict';

const mongoose = require('mongoose');

module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const guessSchema = new Schema({
    homeTeam: {
      type: String,
      required: true
    },
    awayTeam: {
      type: String,
      required: true
    },
    finalScore: {
      type: String,
      required: true
    },
    pontuation: {
      type: Number
    }
  })

  const userGuessSchema = new Schema({
    userID: {
      type: String,
      required: true
    },
    guesses: [guessSchema],
    totalPontuation: {
      type: Number
    }
  });

  const guessesLinesSchema = new Schema({
    championship: {
      type: String,
      required: true
    },
    fixture: {
      type: Number,
      required: true
    },
    users: [userGuessSchema],
    pontuationSetted: {
      type: Boolean
    }
  })

  return db.model('guesseslines', guessesLinesSchema);
}