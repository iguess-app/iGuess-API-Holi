'use strict'

const Joi = require('joi')
const Config = require('iguess-api-coincidents').Config

const fixtureSchema = require('../fixture/fixtureSchema')
const teamEmbeddedSchema = require('../team/teamEmbeddedSchema')

const ID_SIZE = Config.mongo.idStringSize

const request = Joi.object({
  date: Joi.date().required(),
  championshipRef: Joi.string().length(ID_SIZE).required()
})

const response = {
  schema: Joi.object({
      unixDate: Joi.date().required(),
      date: Joi.date().required(),
      championshipRef: Joi.string().length(ID_SIZE).required(),
      games: Joi.array().items(Joi.object({
        stadium: Joi.string(),
        homeTeam: teamEmbeddedSchema.unknown().required(),
        awayTeam: teamEmbeddedSchema.unknown().required(),
        homeTeamScore: Joi.number(),
        awayTeamScore: Joi.number(),
        initTime: Joi.date().iso()
      }).unknown()).required()
    }).unknown().required()
    .meta({
      className: 'Response'
    })
}

module.exports = {
  request,
  response
}