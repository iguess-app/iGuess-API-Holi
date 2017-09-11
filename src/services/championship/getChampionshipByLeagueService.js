'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const getChampionshipByLeagueRepository = app.src.repositories.championship.getChampionshipByLeagueRepository

  const getChampionshipByLeague = (payload) => getChampionshipByLeagueRepository.getChampionshipByLeague(payload)

  return {
    getChampionshipByLeague
  }
};