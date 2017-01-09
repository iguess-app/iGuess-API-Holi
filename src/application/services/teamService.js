'use Strict';

module.exports = (app) => {
  const teamRepository = app.src.application.repositories.teamRepository;

  const getTeams = (reqBody) => {
    return teamRepository.getTeams(reqBody)
  }

  const setTeams = () => {
    teamRepository.setTeams();
  }
  
  return {
    getTeams,
    setTeams
  }
};