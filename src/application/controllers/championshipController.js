'use Strict';

module.exports = (app) => {

  const championshipService = app.src.application.services.championshipService;
  
  const getLastRound = (request, reply) => {
    championshipService.getLastRound(request.headers)
      .then((round) => {
        reply(round)
      });
  }

  const getChampionshipByLeague = (request, reply) => {
    championshipService.getChampionshipByLeague(request.headers)
      .then((championships) => {
        reply(championships)
      });
  }

  return { 
    getLastRound,
    getChampionshipByLeague 
  }
}