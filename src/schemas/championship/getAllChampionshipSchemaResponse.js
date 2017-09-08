'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const fixtureSchema = require('../fixture/fixtureSchema')(app)

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const getAllChampionshipSchemaResponse = Joi.array().items(
    Joi.object({
      _id: Joi.string().length(ID_SIZE).required(),
      league: Joi.string().length(ID_SIZE).required(),
      season: Joi.string().required(),
      championship: Joi.string().required(),
      championshipActive: Joi.bool().required(),
      fixturesNames: Joi.array().items(fixtureSchema).required()
    }))

  return getAllChampionshipSchemaResponse
}

/*eslint global-require: 0*/