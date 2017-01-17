'use Strict';

module.exports = (app) => {

  const championshipService = app.src.application.services.championshipService;
  
  const getLastRound = (request, reply) => {
    championshipService.getLastRound(request.headers)
      .then((round) => {
        reply(round)
      });
  }

  return { getLastRound }
}