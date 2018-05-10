'use strict'

const action = require('./enums/actionsEnums')
const coincidents = require('iguess-api-coincidents')

const requestManager = coincidents.Managers.requestManager
const Config = coincidents.Config

const getEvents = (reqBody) => {
  const uri = Config.apiFootball.url

  const queryStringObj = {
    action: action.getEvents,
    APIkey: Config.apiFootball.APIKey,
    from: reqBody.dateFrom,
    to: reqBody.dateTo
  }

  if (reqBody.leagueIdApiFootbal) {
    queryStringObj.league_id = reqBody.leagueIdApiFootbal
  }
  if (reqBody.countryIdApiFootball) {
    queryStringObj.country_id = reqBody.countryIdApiFootball
  }

  return requestManager.get(uri, {}, queryStringObj)
    .then((response) => _checkErrors(response))
    .catch((apiFootballError) => _treatError(apiFootballError))
}

const _checkErrors = (response) => {
  if (response.error) {
    throw response
  }

  return response
}

const _treatError = (apiFootballError) => {
  const stringError = JSON.stringify({ apiFootballError })
  throw Error(stringError)
}

module.exports = getEvents

/*eslint camelcase: 0*/