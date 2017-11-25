'use strict'

const mongoose = require('mongoose')

const optionsSchemas = require('./optionsSchemas/optionsSchemas')
const db = require('./connect')

const Schema = mongoose.Schema

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

module.exports = db.model('leagues', leagueSchema)