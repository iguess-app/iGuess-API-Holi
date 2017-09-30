'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getChampionshipByIdRepository = require('../../repositories/championship/getChampionshipByIdRepository')

const getChampionshipById = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getChampionshipByIdRepository(payload, dictionary)
}

module.exports = getChampionshipById