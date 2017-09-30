'use strict'

const Boom = require('boom')

const Round = require('../../models/roundModel')
const QueryUtils = require('iguess-api-coincidents').Utils.queryUtils

const getLastRound = (reqBody, dictionary) => _findLastRound(reqBody, dictionary)

const _findLastRound = (reqBody, dictionary) => {
  const searchQuery = _buildSearchQuery(reqBody)

  return Round.findOne(searchQuery).sort('-fixtureNumber')
    .then((lastRound) => {
      _checkErrors(lastRound, dictionary)
      return QueryUtils.makeObject(lastRound)
    })
    .catch((err) => Boom.badData(err))
}

const _buildSearchQuery = (reqBody) => {
  const searchQuery = {
    'championshipRef': reqBody.championshipRef
  }
  if (reqBody.newestStarted === true) {
    searchQuery.started = reqBody.newestStarted
  }

  return searchQuery
}

const _checkErrors = (lastRound, dictionary) => {
  if (!lastRound) {
    throw Boom.notFound(dictionary.roundNotFound)
  }
}

module.exports = getLastRound