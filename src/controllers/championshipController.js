'use Strict';

module.exports = (app) => {
  const championshipService = app.src.services.championshipService;
  const getChampionshipByIdService = app.src.services.championship.getChampionshipByIdService;
  const getAllchampionshipService = app.src.services.championship.getAllchampionshipService;

  const getLastRound = (request, reply) => {
    championshipService.getLastRound(request.query, request.headers)
      .then((round) => {
        reply(round)
      });
  }

  const getChampionshipByLeague = (request, reply) => {
    championshipService.getChampionshipByLeague(request.query, request.headers)
      .then((championships) => {
        reply(championships)
      });
  }

  const getChampionshipById = (request, reply) => {
    getChampionshipByIdService.getChampionshipById(request.query, request.headers)
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