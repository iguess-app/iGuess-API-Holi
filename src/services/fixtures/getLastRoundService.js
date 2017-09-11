'use strict'

module.exports = (app) => {
  const getLastRoundRepository = app.src.repositories.fixtures.getLastRoundRepository

  const getLastRound = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return getLastRoundRepository.getLastRound(payload, dictionary)
  }

  return {
    getLastRound
  }
}