'use Strict';

const Boom = require('boom');

module.exports = (app) => {
  const League = app.src.schemas.leagueSchema;
  const Team = app.src.schemas.teamSchema;

  const getTeams = (reqBody) => new Promise((resolve, reject) => {
    League.findOne({ 'countryInitials': reqBody.countryInitials, 'serie': reqBody.serie }, 
    (leagueErr, league) => {
      if (leagueErr) {
        reject(Boom.badData(leagueErr));
      }
      //Create here some exception to when there is no league.id
      Team.find({ 'league': league.id }, { '_id': 0, 'league': 0, 'fullName': 0, 'logo':0 }, 
      (teamErr, teams) => {
        if (teamErr) {
          reject(teamErr)
        }

        const leagueObj = league.toObject();
        leagueObj.teams = teams;
        resolve(leagueObj)
      })
    })
  })

  return { getTeams }
}