'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const db = app.coincidents.Managers.mongoManager
  const mongo = app.coincidents.Config.mongo
  const serverErrors = app.coincidents.Utils.errorUtils.serverErrors
  const userErrors = app.coincidents.Utils.errorUtils.userErrors
  const validateFixture = require('./subValidations/fixture')(app)

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

  return db.model('championships', championshipSchema)

}

/*eslint global-require: 0*/