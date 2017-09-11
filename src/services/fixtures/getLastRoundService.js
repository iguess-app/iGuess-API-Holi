'use strict'

module.exports = (app) => {
  const getLastRoundRepository = app.src.repositories.fixtures.getLastRoundRepository

  const getLastRound = (payload) => getLastRoundRepository.getLastRound(payload)

  return {
    getLastRound
  }
}