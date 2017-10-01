'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getFixtureByChampionshipRefAndDateRepository = require('../../repositories/fixtures/getFixtureByChampionshipRefAndDateRepository')

const getFixtureByChampionshipRefAndDate = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getFixtureByChampionshipRefAndDateRepository(payload, dictionary)
}

module.exports = getFixtureByChampionshipRefAndDate