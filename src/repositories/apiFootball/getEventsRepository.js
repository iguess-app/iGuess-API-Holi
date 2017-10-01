'use strict'

const championship = require('./enums/championshipEnums')
const action = require('./enums/actionsEnums')
const coincidents = require('iguess-api-coincidents')
const requestManager = coincidents.Managers.requestManager
const log = coincidents.Managers.logManager
const Config = coincidents.Config

const getEvents = (reqBody, dictionary, headers) => {
  const uri = Config.apiFootball.url

  const obj = {
    action: action.getEvents,
    APIkey: Config.apiFootball.APIKey,
    league_id: championship.brazilianChampionship, //TODO: do dinamically
    from: reqBody.dateFrom,
    to: reqBody.dateTo
  }

  return requestManager.get(uri, headers, obj)
    .catch((err) => log.error(err))
}


module.exports = getEvents

/*eslint camelcase: 0*/