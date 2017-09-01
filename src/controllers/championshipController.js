'use Strict';

module.exports = (app) => {
  const championshipService = app.src.services.championshipService;
  const getChampionshipService = app.src.services.championship.getChampionshipService;
  const getAllchampionshipService = app.src.services.championship.getAllchampionshipService;

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

  const getChampionshipById = (request, reply) => {
    getChampionshipService.getChampionshipById(request.query, request.headers)
      .then((championship) => {
        reply(championship)
      })
      .catch((err) =>
        reply(err)
      );
  }

  const getAllchampionship = (request, reply) => {
    getAllchampionshipService.getAllchampionship(request.query, request.headers)
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
    getChampionshipById,
    getAllchampionship
  }
}