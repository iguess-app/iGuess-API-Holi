'use strict'

const fs = require('fs')

const championship = require('./enums/championshipEnums')
const action = require('./enums/actionsEnums')
const coincidents = require('iguess-api-coincidents')
const requestManager = coincidents.Managers.requestManager
const apis = coincidents.Config.apis

const getEvents = (reqBody, headers) => {
  const uri = `http://apifootball.com/api/`

  const obj = {
    action: action.getEvents,
    APIkey: '6f60688e08d2657cb247eaa636b1604425ddd76ee4bacfd007f909442ea06404', //put at config file
    league_id: championship.brazilianChampionship,
    from: reqBody.dateFrom,
    to: reqBody.dateTo
  }

  //const mocked = JSON.parse(fs.readFileSync(__dirname + '/mockedJson.json', 'utf-8'))
  //return new Promise((resolve, reject) => resolve(mocked))

  return requestManager.get(uri, headers, obj)
}


module.exports = getEvents