'use strict'

const Boom = require('boom')

const Teams = require('../../models/teamModel')

const getTeams = (apiFootballName) => {

  const searchQuery = {
    apiFootballName
  }

  return Teams.findOne(searchQuery)
    .then((team) => {
      _checkErrors(team, apiFootballName)

      return team.toJSON()
    })
}

const _checkErrors = (team, apiFootballName) => {
  if (!team) {
    throw Boom.notImplemented(`Team not found ${apiFootballName}`)
  }
}

module.exports = getTeams