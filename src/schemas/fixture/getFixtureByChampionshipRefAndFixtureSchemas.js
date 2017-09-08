'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const fixtureSchema = require('../fixture/fixtureSchema')(app)

  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const getFixtureByChampionshipRefAndFixtureRequest = Joi.object({ 
    fixture: fixtureSchema.required(),
    championshipRef: Joi.number().length(ID_SIZE).required()
  })

  const getFixtureByChampionshipRefAndFixtureResponse = {
    schema: Joi.object({
      country: Joi.string().required(),
      countryInitials: Joi.string().required(),
      name: Joi.string().required(),
      serie: Joi.number().required(),
      teams: Joi.array().items(
        Joi.object({
          shortName: Joi.string().required(),
          fullName: Joi.string(),
          logo: Joi.string(),
          league: Joi.string()
        }).unknown())
    }).unknown()
    .meta({ className: 'Response' })
  }

  return {
    getFixtureByChampionshipRefAndFixtureRequest,
    getFixtureByChampionshipRefAndFixtureResponse
  }
}

/*eslint global-require: 0*/