'use strict'

const mongoose = require('mongoose')

const coincidents = require('iguess-api-coincidents')
const db = coincidents.Managers.mongoManager
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors
const userErrors = coincidents.Utils.errorUtils.userErrors

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const optionsSchemas = require('./optionsSchemas/optionsSchemas')
const validateFixture = require('./subValidations/fixture')

const fixtureName = {
  type: Mixed,
  required: true,
  validate: [validateFixture, String(userErrors.notValidFixture)]
}

const championshipSchema = new Schema({
  league: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  season: {
    type: String,
    required: true
  },
  championship: {
    type: String,
    required: true
  },
  championshipActive: {
    type: Boolean,
    required: true
  },
  fixturesNames: {
    type: [fixtureName],
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('championships', championshipSchema)