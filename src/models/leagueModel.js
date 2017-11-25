'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

const Schema = mongoose.Schema
const db = coincidents.Managers.mongoManager()

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