'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const championshipController = app.src.application.controllers.championshipController;
  const server = app.configServer;

  server.route({
    path: '/championship/getchampionshipbyleague',
    method: 'POST',
    config: {
      handler: (request, reply) => {

        championshipController.getChampionshipByLeague(request, reply)
      },
      validate: {
        payload: Joi.object({
          championship: Joi.string().required(),
          serie: Joi.number().required()
        })
        .meta({ className: 'Request' })
      },
      response: {
        schema: Joi.object().unknown()
        .meta({ className: 'Response' })
      }
    }
  })

  server.route({
    path: '/championship/lastRound',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        championshipController.getLastRound(request, reply)
      },
      validate: {
        headers: Joi.object({ championship: Joi.string().required() })
        .unknown()
        .meta({ className: 'Request' })
      },
      response: {
        schema: Joi.object().unknown()
        .meta({ className: 'Response' })
      }
    }
  })

};