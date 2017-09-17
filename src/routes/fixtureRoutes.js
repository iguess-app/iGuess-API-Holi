'use strict'

module.exports = (app) => {
  const fixtureController = app.src.controllers.fixtureController
  const server = app.configServer
  const schemas = app.src.schemas

  server.route({
    path: '/fixture/getFixtureByChampionshipRefAndFixture',
    method: 'GET',
    config: {
      handler: (request, reply) => {
        fixtureController.getFixtureByChampionshipRefAndFixture(request, reply)
      },
      validate: {
        query: schemas.fixture.getFixtureByChampionshipRefAndFixtureSchemas.request,
        headers: schemas.defaultHeaderSchema
      },
      response: schemas.fixture.getFixtureByChampionshipRefAndFixtureSchemas.response
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
        query: schemas.fixture.getLastRoundSchema.getLastRoundRequest,
        headers: schemas.defaultHeaderSchema
      }
    }
  })
}