'use Strict';

module.exports = (app) => {
  const getFixtureByChampionshipRefAndFixtureService = app.src.services.fixtures.getFixtureByChampionshipRefAndFixtureService;

  const getFixtureByChampionshipRefAndFixture = (request, reply) => {
    getFixtureByChampionshipRefAndFixtureService.getFixtureByChampionshipRefAndFixture(request.query, request.headers)
      .then((teams) => reply(teams))
      .catch((err) => reply(err))
  }

  return {
    getFixtureByChampionshipRefAndFixture
  }
}