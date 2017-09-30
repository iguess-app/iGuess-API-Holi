'use strict'

const Joi = require('joi')

const server = require('../../configServer')
const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')
const teamController = require('../controllers/teamController')

server.route({
  path: '/team/teamsbyleague',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      teamController.getTeams(request, reply)
    },
    validate: {
      query: Joi.object({
        countryinitials: Joi.string().required(),
        serie: Joi.number().required()
      }),
      headers: defaultHeaderSchema
    },
    response: {
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
        .meta({
          className: 'Response'
        })
    }
  }
})