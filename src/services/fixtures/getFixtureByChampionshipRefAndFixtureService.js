'use strict'

module.exports = (app) => {
  const getFixtureByChampionshipRefAndFixtureRepository = app.src.repositories.fixtures.getFixtureByChampionshipRefAndFixtureRepository

  const getFixtureByChampionshipRefAndFixture = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getFixtureByChampionshipRefAndFixtureRepository.getFixtureByChampionshipRefAndFixture(payload, dictionary)
  }

  return {
    getFixtureByChampionshipRefAndFixture
  }
};