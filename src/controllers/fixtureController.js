'use strict'

const getFixtureByChampionshipRefAndFixtureService = require('../services/fixtures/getFixtureByChampionshipRefAndFixtureService')
const getLastRoundService = require('../services/fixtures/getLastRoundService')
const updateFixtureService = require('../services/fixtures/updateFixtureService')

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
  updateFixtureService(request.query, request.headers)
  .then((round) => reply(round))
  .catch((err) => reply(err))
}

module.exports = {
  getFixtureByChampionshipRefAndFixture,
  getLastRound,
  getEvents
}