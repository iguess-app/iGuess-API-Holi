'use strict'

const Boom = require('boom')

const coincidents = require('iguess-api-coincidents')
const log = coincidents.Managers.logManager

module.exports = (app) => {
  const Round = app.src.models.roundModel
  const QueryUtils = app.coincidents.Utils.queryUtils

  const insertNewMatchDayAtRoundsRepository = (newRound, dictionary) => {
    
    return Round.create(newRound)
    .catch((err) => {
      log.error(err)
      throw err
    })
  }

  const _checkErrors = (lastRound, dictionary) => {
    if (!lastRound) {
      throw Boom.notFound(dictionary.roundNotFound)
    }
  }

  return insertNewMatchDayAtRoundsRepository
}