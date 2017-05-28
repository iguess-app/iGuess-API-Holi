'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const championshipController = app.src.controllers.championshipController;
  const server = app.configServer;

  server.route({
    path: '/championship/getchampionshipbyleague',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        championshipController.getChampionshipByLeague(request, reply)
      },
      validate: {
        query: Joi.object({
          league: Joi.string().required()
        })
      },
      response: {
        schema: Joi.object().unknown()
          .meta({
            className: 'Response'
          })
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
      response: {
        schema: Joi.object().unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })

  server.route({
    path: '/championship/getChampionship',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        championshipController.getChampionship(request, reply)
      },
      validate: {
        query: Joi.object({
          championshipId: Joi.string().required()
        })
      },
      response: {
        schema: Joi.object().unknown()
          .meta({
            className: 'Response'
          })
      }
    }
  })

};