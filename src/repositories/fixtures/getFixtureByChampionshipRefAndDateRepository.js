'use strict'

const Boom = require('boom')
const moment = require('moment')

const Round = require('../../models/roundModel')

const getFixtureByChampionshipRefAndDate = (payload, dictionary) => {
  const searchQuery = {
    championshipRef: payload.championshipRef,
    unixDate: moment(payload.date).format('X')
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

module.exports = getFixtureByChampionshipRefAndDate