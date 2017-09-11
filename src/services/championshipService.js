'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const championshipRepository = app.src.repositories.championshipRepository

  const getChampionshipByLeague = (payload) => championshipRepository.getChampionshipByLeague(payload)

  return {
    getChampionshipByLeague
  }
};