'use strict'

const Boom = require('boom')
const Promise = require('bluebird')
const QueryUtils = require('iguess-api-coincidents').Utils.queryUtils

const League = require('../models/leagueModel')
const Team = require('../models/teamModel')

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

module.exports = { 
  leagueById, 
  teamById, 
  getTeams 
}