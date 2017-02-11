'use Strict';

module.exports = (app) => {
  const teamRepository = app.src.application.repositories.teamRepository;

  const getTeams = (payload) => teamRepository.getTeams(payload)
  
  return { getTeams }
};