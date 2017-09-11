'use strict'

const Joi = require('joi')

module.exports = (app) => {
  const Config = app.coincidents.Config
  const ID_SIZE = Config.mongo.idStringSize

  const getLastRoundRequest = Joi.object({
    newestStarted: Joi.bool().default(false),
    championshipRef: Joi.string().length(ID_SIZE).required()
  })

  const getLastRoundResponse = {
    schema: Joi.object({}).required()
      .meta({
        className: 'Response'
      })
  }

  return {
    getLastRoundRequest,
    getLastRoundResponse
  }
}

/*eslint global-require: 0*/