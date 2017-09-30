'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema


const coincidents = require('iguess-api-coincidents')
const db = coincidents.Managers.mongoManager
const optionsSchemas = require('./optionsSchemas/optionsSchemas')

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