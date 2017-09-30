'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getAllChampionshipRepository = require('../../repositories/championship/getAllChampionshipRepository')

const getAllchampionship = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getAllChampionshipRepository(payload, dictionary)
}

module.exports = getAllchampionship