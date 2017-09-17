'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const fixtureSchema = require('../fixture/fixtureSchema')(app)
  const teamEmbeddedSchema = require('../team/teamEmbeddedSchema')(app)

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const request = Joi.object({
    fixture: fixtureSchema,
    championshipRef: Joi.string().length(ID_SIZE).required()
  })

  const response = {
    schema: Joi.object({
        fixture: fixtureSchema,
        championshipRef: Joi.string().length(ID_SIZE).required(),
        ended: Joi.bool().required(),
        started: Joi.bool().required(),
        games: Joi.array().items(Joi.object({
          stadium: Joi.string().required(),
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

  return {
    request,
    response
  }
}

/*eslint global-require: 0*/