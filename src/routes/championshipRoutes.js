'use strict'

const Joi = require('joi')

const server = require('../../configServer')
const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')
const getAllChampionshipSchemaResponse = require('./schemas/championship/getAllChampionshipSchemaResponse')
const championshipController = require('../controllers/championshipController')

server.route({
  path: '/championship/getChampionshipByLeague',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      championshipController.getChampionshipByLeague(request, reply)
    },
    validate: {
      query: Joi.object({
        league: Joi.string().required()
      }),
      headers: defaultHeaderSchema
    },
    response: {
      schema: Joi.array()
        .meta({
          className: 'Response'
        })
    }
  }
})

server.route({
  path: '/championship/getChampionshipById',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      championshipController.getChampionshipById(request, reply)
    },
    validate: {
      query: Joi.object({
        championshipId: Joi.string().required()
      }),
      headers: defaultHeaderSchema
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
  path: '/championship/getAllchampionship',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      championshipController.getAllchampionship(request, reply)
    },
    validate: {
      query: Joi.object({
        onlyActive: Joi.bool().default(false)
      }),
      headers: defaultHeaderSchema
    },
    response: {
      schema: getAllChampionshipSchemaResponse
    }
  }
})