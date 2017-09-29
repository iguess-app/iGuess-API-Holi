'use strict'

const fs = require('fs')
const Boom = require('boom')

const coincidents = require('iguess-api-coincidents')
const requestManager = coincidents.Managers.requestManager
const apis = coincidents.Config.apis

module.exports = (app) => {
  const Teams = app.src.models.teamModel

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

  return {
    getTeams
  }
}

const _checkErrors = (team, apiFootballName) => {
  if (!team) {
    throw Boom.notImplemented(`Team not found ${apiFootballName}`)
  }
}