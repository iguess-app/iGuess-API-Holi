'use strict'

module.exports = (app) => {
  const getFixtureByChampionshipRefAndFixtureService = app.src.services.fixtures.getFixtureByChampionshipRefAndFixtureService
  const getLastRoundService = app.src.services.fixtures.getLastRoundService

  const getFixtureByChampionshipRefAndFixture = (request, reply) => {
    getFixtureByChampionshipRefAndFixtureService.getFixtureByChampionshipRefAndFixture(request.query, request.headers)
      .then((teams) => reply(teams))
      .catch((err) => reply(err))
  }

  const getLastRound = (request, reply) => {
    getLastRoundService.getLastRound(request.query, request.headers)
      .then((round) => {
        reply(round)
      });
  }

  return {
    getFixtureByChampionshipRefAndFixture,
    getLastRound
  }
}