'use Strict';

module.exports = (app) => {
  const championshipRepository = app.src.application.repositories.championshipRepository;

  const getLastRound = (payload) => championshipRepository.getLastRound(payload)

  const getChampionshipByLeague = (payload) => championshipRepository.getChampionshipByLeague(payload)
  
  return {
    getLastRound,
    getChampionshipByLeague
  }
};