'use Strict';

module.exports = (app) => {
  const championshipRepository = app.src.application.repositories.championshipRepository;

  const getLastRound = (headers) => championshipRepository.getLastRound(headers)

  const getChampionshipByLeague = (headers) => championshipRepository.getChampionshipByLeague(headers)
  
  return {
    getLastRound,
    getChampionshipByLeague
  }
};