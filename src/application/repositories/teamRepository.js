'use Strict';

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const League = app.src.schemas.leagueSchema;
  const Team = app.src.schemas.teamSchema;

  const getTeams = (reqBody) => 
    _findLeague(reqBody)
      .then((league) => _makeObject(league))
      .then((league) => _findTeams(league))
      .catch((err) => Boom.badData(err))

  const _findLeague = (reqBody) => 
    Promise.resolve(League.findOne({ 'countryInitials': reqBody.countryInitials, 'serie': reqBody.serie })
      .then((league) => league)
      .catch((err) => err)
    )
    
  const _makeObject = (league) => league.toObject()

  const _findTeams = (league) =>
    Team.find({ 'league': league._id }, { '_id': 0, 'league': 0, 'fullName': 0, 'logo': 0 })
      .then((teams) => {
        league.teams = teams;
        
        return league;
      })

  return { getTeams }
}