'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const db = app.coincidents.Managers.mongoManager

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
    serie: {
      type: Number
    }
  }, optionsSchemas.versionKeyDisable)

  return db.model('leagues', leagueSchema)
}