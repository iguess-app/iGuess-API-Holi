'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const db = app.coincidents.Managers.mongoManager
  const mongo = app.coincidents.Config.mongo
  const serverErrors = app.coincidents.Utils.errorUtils.serverErrors

  const teamSchema = new Schema({
    league: {
      type: String,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
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
  }, optionsSchemas.versionKeyDisable)

  return db.model('teams', teamSchema)
}