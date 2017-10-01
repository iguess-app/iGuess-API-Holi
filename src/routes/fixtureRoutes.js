'use strict'

const server = require('../../configServer')
const schemas = require('./schemas/fixture')
const defaultHeaderSchema = require('./schemas/defaultHeaderSchema')
const fixtureController = require('../controllers/fixtureController')

server.route({
  path: '/fixture/getFixtureByChampionshipRefAndDate',
  method: 'GET',
  config: {
    handler: (request, reply) => {
      fixtureController.getFixtureByChampionshipRefAndDate(request, reply)
    },
    validate: {
      query: schemas.getFixtureByChampionshipRefAndDateSchemas.request,
      headers: defaultHeaderSchema
    },
    response: schemas.getFixtureByChampionshipRefAndDateSchemas.response
  }
})

server.route({
  path: '/fixture/lastRound',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      fixtureController.getLastRound(request, reply)
    },
    validate: {
      query: schemas.getLastRoundSchema.getLastRoundRequest,
      headers: defaultHeaderSchema
    }
  }
})

server.route({
  path: '/fixture/getEvents',
  method: 'GET',
  config: {
    handler: (request, reply) => {

      fixtureController.getEvents(request, reply)
    },
    validate: {
      headers: defaultHeaderSchema
    }
  }
})