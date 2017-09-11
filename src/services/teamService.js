'use strict'

module.exports = (app) => {
  const teamRepository = app.src.repositories.teamRepository;

  const getTeams = (payload) => teamRepository.getTeams(payload)
  
  return { getTeams }
};