'use Strict';

module.exports = (app) => {
  const championshipService = app.src.services.championshipService;
  const getChampionshipService = app.src.services.championship.getChampionshipService;

  const getLastRound = (request, reply) => {
    championshipService.getLastRound(request.query)
      .then((round) => {
        reply(round)
      });
  }

  const getChampionshipByLeague = (request, reply) => {
    championshipService.getChampionshipByLeague(request.query)
      .then((championships) => {
        reply(championships)
      });
  }

  const getChampionship = (request, reply) => {
    getChampionshipService.getChampionship(request.query, request.headers)
      .then((championship) => {
        reply(championship)
      })
      .catch((err) =>
        reply(err)
      );
  }

  return {
    getLastRound,
    getChampionshipByLeague,
    getChampionship
  }
}