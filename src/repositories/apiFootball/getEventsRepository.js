'use strict'

const Boom = require('boom')

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
    .then((response) => _checkErrors(response))
    .then((response) => _treatBug(response))
    .catch((err) => {
      log.error(err)
      throw err
    })
}

const _checkErrors = (response) => {
  if (response.error) {
    throw Boom.create(response.error, response.message)
  }

  return response
}

/*API Football call 'Sport Recife' and 'Sport' like different teams, and thats wrong,
we already sent a email telling the problem but this function is to solve the problem temporally */
const _treatBug = (response) =>
  response.reduce((acumulator, event) => {
    if (event.match_hometeam_name === 'Sport' || event.match_awayteam_name === 'Sport') {
      return acumulator
    }
    acumulator.push(event)

    return acumulator
  }, [])

module.exports = getEvents

/*eslint camelcase: 0*/