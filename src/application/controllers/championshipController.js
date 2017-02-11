'use Strict';

module.exports = (app) => {

  const championshipService = app.src.application.services.championshipService;
  
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

  return { 
    getLastRound,
    getChampionshipByLeague 
  }
}