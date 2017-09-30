'use strict'

const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getFixtureByChampionshipRefAndFixtureRepository = require('../../repositories/fixtures/getFixtureByChampionshipRefAndFixtureRepository')

const getFixtureByChampionshipRefAndFixture = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  return getFixtureByChampionshipRefAndFixtureRepository(payload, dictionary)
}

module.exports = getFixtureByChampionshipRefAndFixture