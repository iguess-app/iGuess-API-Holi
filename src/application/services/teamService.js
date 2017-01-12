'use Strict';

module.exports = (app) => {
  const teamRepository = app.src.application.repositories.teamRepository;

  const getTeams = (reqBody) => teamRepository.getTeams(reqBody)
  
  return { getTeams }
};