'use Strict';

module.exports = (app) => {
  const getFixtureByChampionshipRefAndFixtureRepository = app.src.repositories.fixture.getFixtureByChampionshipRefAndFixtureRepository

  const getFixtureByChampionshipRefAndFixture = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getFixtureByChampionshipRefAndFixtureRepository.getFixtureByChampionshipRefAndFixture(payload, dictionary)
  }

  return {
    getFixtureByChampionshipRefAndFixture
  }
};