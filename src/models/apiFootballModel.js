'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const optionsSchemas = require('./optionsSchemas/optionsSchemas')
const db = require('./connect')

const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors
const Schema = mongoose.Schema

const apiFootballSchema = new Schema({
  currentChampionshipRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  description: {
    type: String
  },
  leagueIdApiFootbal: {
    type: Number,
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('api_footballs', apiFootballSchema)