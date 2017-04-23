'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const championshipRepository = app.src.repositories.championshipRepository;
  const teamRepository = app.src.repositories.teamRepository;

  const getLastRound = (payload) => championshipRepository.getLastRound(payload)
    .then((lastRound) => {
      //TODO Improve the code at this scope, check if is possible use the array.prototype.map and a promise inside of him scope
      //if not, check another way to get the teams info and return with the lastRound request.

      const fullInfoResult = [];
      //TODO Put this function in some util because some request will needs to replace the teamID by the teamInfo
      return new Promise((resolve) => {

        lastRound.results.forEach((individualResult, index, array) => {
          const homeTeamPromise = teamRepository.teamById(individualResult.homeTeam);
          const awayTeamPromise = teamRepository.teamById(individualResult.awayTeam);

          return Promise.all([homeTeamPromise, awayTeamPromise])
            .spread((homeTeam, awayTeam) => {
              individualResult.homeTeam = homeTeam;
              individualResult.awayTeam = awayTeam;

              if (index + 1 === array.length) {
                resolve(fullInfoResult);
              }

              fullInfoResult.push(individualResult);
            });
        })
      }).then((results) => {
        lastRound.results = results;

        return lastRound;
      })

    })

  const getChampionshipByLeague = (payload) => championshipRepository.getChampionshipByLeague(payload)

  return {
    getLastRound,
    getChampionshipByLeague
  }
};