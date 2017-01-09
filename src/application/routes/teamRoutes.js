'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const teamController = app.src.application.controllers.teamController;
  const server = app.configServer;

  server.route({
    path: '/getteams',
    method: 'POST',
    config: {
      handler: (request, reply) => {

        teamController.getTeams(request, reply)
      },
      response: {
        schema: Joi.object({
          country: Joi.string().required(),
          countryInitials: Joi.string().required(),
          name: Joi.string().required(),
          serie: Joi.number().required(),
          teams: Joi.array()
        }).unknown()
        .meta({ className: 'Response' })
      }
    }
  })

  server.route({
    path: '/setteams',
    method: 'POST',
    config: {
      handler: (request, reply) => {

        teamController.setTeams(request, reply)
      }
    }
  })
};