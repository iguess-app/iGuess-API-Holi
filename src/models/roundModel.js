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

  const teamSchema = new Schema({
    teamRef: {
      type: String,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
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
  }, optionsSchemas._idAndVersionKeyDisable)

  const gamesSchema = new Schema({
    homeTeam: {
      type: teamSchema,
      required: true
    },
    awayTeam: {
      type: teamSchema,
      required: true
    },
    homeTeamScore: {
      type: Number
    },
    awayTeamScore: {
      type: Number
    },
    initTime: {
      type: Date,
      required: true
    },
    ended: {
      type: Boolean,
      required: true,
      default: false
    },
    stadium: {
      type: String
    }
  }, optionsSchemas.versionKeyDisable)

  const roundSchema = new Schema({
    championshipRef: {
      type: String,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
    date: {
      type: Date,
      required: true
    },
    unixDate: {
      type: Number,
      required: true
    },
    games: {
      type: [gamesSchema],
      required: true
    }
  }, optionsSchemas.versionKeyDisable)

  return db.model('rounds', roundSchema)

}

/*eslint global-require: 0*/