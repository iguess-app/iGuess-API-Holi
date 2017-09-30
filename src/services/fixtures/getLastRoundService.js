'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getLastRoundRepository = require('../../repositories/fixtures/getLastRoundRepository')

const getLastRound = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getLastRoundRepository(payload, dictionary)
}

module.exports = getLastRound