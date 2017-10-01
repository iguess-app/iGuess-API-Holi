'use strict'

const getFixtureByChampionshipRefAndFixtureService = require('../services/fixtures/getFixtureByChampionshipRefAndFixtureService')
const getLastRoundService = require('../services/fixtures/getLastRoundService')
const updateAllFixtureService = require('../services/fixtures/updateAllFixtureService')

const getFixtureByChampionshipRefAndFixture = (request, reply) => {
  getFixtureByChampionshipRefAndFixtureService(request.query, request.headers)
    .then((teams) => reply(teams))
    .catch((err) => reply(err))
}

const getLastRound = (request, reply) => {
  getLastRoundService(request.query, request.headers)
    .then((round) => reply(round))
    .catch((err) => reply(err))
}

const getEvents = (request, reply) => {
  updateAllFixtureService(request.query, request.headers)
  .then((round) => reply(round))
  .catch((err) => reply(err))
}

module.exports = {
  getFixtureByChampionshipRefAndFixture,
  getLastRound,
  getEvents
}