'use strict'

const Boom = require('boom')

const action = require('./enums/actionsEnums')
const coincidents = require('iguess-api-coincidents')

const requestManager = coincidents.Managers.requestManager
const log = coincidents.Managers.logManager
const Config = coincidents.Config

const getEvents = (reqBody) => {
  const uri = Config.apiFootball.url

  const obj = {
    action: action.getEvents,
    APIkey: Config.apiFootball.APIKey,
    league_id: reqBody.leagueIdApiFootbal,
    from: reqBody.dateFrom,
    to: reqBody.dateTo
  }

  return requestManager.get(uri, {}, obj)
    .then((response) => _checkErrors(response))
}

const _checkErrors = (response) => {
  if (response.error) {
    throw new Error(JSON.stringify(response))
  }

  return response
}

module.exports = getEvents

/*eslint camelcase: 0*/