'use strict'

const getFixtureByChampionshipRefAndDateService = require('../services/fixtures/getFixtureByChampionshipRefAndDateService')
const getLastRoundService = require('../services/fixtures/getLastRoundService')
const updateAllFixtureService = require('../services/fixtures/updateAllFixtureService')

const getFixtureByChampionshipRefAndDate = (request, reply) => {
  getFixtureByChampionshipRefAndDateService(request.query, request.headers)
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
  getFixtureByChampionshipRefAndDate,
  getLastRound,
  getEvents
}