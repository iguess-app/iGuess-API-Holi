'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getChampionshipByLeagueRepository = require('../../repositories/championship/getChampionshipByLeagueRepository')

const getChampionshipByLeague = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getChampionshipByLeagueRepository(payload, dictionary)
}

module.exports = getChampionshipByLeague