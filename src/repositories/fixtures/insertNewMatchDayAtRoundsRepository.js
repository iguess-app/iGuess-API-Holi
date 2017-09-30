'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const Round = require('../../models/roundModel')

const log = coincidents.Managers.logManager

const insertNewMatchDayAtRoundsRepository = (newRound, dictionary) => {
  
  return Round.create(newRound)
  .catch((err) => {
    log.error(err)
    throw err
  })
}

module.exports = insertNewMatchDayAtRoundsRepository