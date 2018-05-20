'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const optionsSchemas = require('./optionsSchemas/optionsSchemas')
const logoSchema = require('./subValidations/logo')
const db = require('./connect')

const Schema = mongoose.Schema
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors

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
    type: logoSchema,
    required: true
  },
  apiFootballName: {
    type: String,
    required: true
  }
}, optionsSchemas._idAndVersionKeyDisable)

const matchSchema = new Schema({
  championshipRef: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  matchRef: {
    type: String,
    required: true,
    unique: true
  },
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
  started: {
    type: Boolean,
    default: false
  },
  minutes: {
    type: String
  },
  percentageCompleted: {
    type: Number
  },
  stadium: {
    type: String
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('matches', matchSchema)