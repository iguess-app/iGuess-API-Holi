'use strict'

const Boom = require('boom')
const moment = require('moment')

const Round = require('../../models/roundModel')
const QueryUtils = require('iguess-api-coincidents').Utils.queryUtils

const getLastRound = (reqBody, dictionary) => _findLastRound(reqBody, dictionary)

const _findLastRound = (reqBody, dictionary) => {
  const searchQuery = _buildSearchQuery(reqBody)

  return Round.findOne(searchQuery)
    .then((lastRound) => {
      _checkErrors(lastRound, dictionary)

      return QueryUtils.makeObject(lastRound)
    })
    .catch((err) => Boom.badData(err))
}

const _buildSearchQuery = (reqBody) => {
  const todayWithNoHour = moment().format('DD/MM/YYYY')

  const searchQuery = {
    'championshipRef': reqBody.championshipRef,
    'unixDate': moment(todayWithNoHour, 'DD/MM/YYYY').format('X')
  }

  return searchQuery
}

const _checkErrors = (lastRound, dictionary) => {
  if (!lastRound) {
    throw Boom.notFound(dictionary.roundNotFound)
  }
}

module.exports = getLastRound