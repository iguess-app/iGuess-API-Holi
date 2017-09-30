'use strict'

const Boom = require('boom')

const Round = require('../../models/roundModel')

const getFixtureByChampionshipRefAndFixture = (payload, dictionary) => {
  const searchQuery = {
    championshipRef: payload.championshipRef,
    fixture: payload.fixture
  }

  return Round.findOne(searchQuery)
    .then((roundFound) => {
      _checkErrors(roundFound, dictionary)

      return roundFound
    })
}

const _checkErrors = (roundFound, dictionary) => {
  if (!roundFound) {
    throw Boom.notFound(dictionary.roundNotFound)
  }
}

module.exports = getFixtureByChampionshipRefAndFixture