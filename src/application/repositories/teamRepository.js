'use Strict';

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const QueryUtils = app.src.utils.queryUtils;
  const League = app.src.schemas.leagueSchema;
  const Team = app.src.schemas.teamSchema;

  const leagueById = (id) =>
  Team.findOne({_id: id}) 
    .then((league) => QueryUtils.makeObject(league))

  const teamById = (id) =>
    Team.findOne({_id: id}) 
      .then((team) => QueryUtils.makeObject(team))

  const getTeams = (reqBody) => 
    _findLeague(reqBody)
      .then((league) => _findTeams(league))
      .catch((err) => Boom.badData(err))

  const _findLeague = (reqBody) => 
    Promise.resolve(League.findOne({ 'countryInitials': reqBody.countryinitials, 'serie': reqBody.serie })
      .then((league) => QueryUtils.makeObject(league))
      .catch((err) => err)
    )

  const _findTeams = (league) =>
    Team.find({ 'league': league._id }, { '_id': 0, 'league': 0, 'logo': 0 })
      .then((teams) => {
        league.teams = teams;

        return league;
      })

  return { 
    leagueById, 
    teamById, 
    getTeams 
  }
}