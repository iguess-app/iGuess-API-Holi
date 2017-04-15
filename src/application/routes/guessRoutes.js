'use strict';

const Joi = require('joi');

module.exports = (app) => {
  const guessController = app.src.application.controllers.guessController;
  const server = app.configServer;

  server.route({
    path: '/guess/laucher',
    method: 'GET',
    config: {
      handler: (request, reply) => {

        guessController.laucher(request, reply)
      },
      validate: {
        query: Joi.object({})
      },
      response: {
        schema: Joi.object().unknown()
          .meta({className: 'Response'})
      }
    }
  })


};