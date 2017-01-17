'use Strict';

module.exports = (app) => {
  const championshipRepository = app.src.application.repositories.championshipRepository;

  const getLastRound = (headers) => championshipRepository.getLastRound(headers)
  
  return { getLastRound }
};