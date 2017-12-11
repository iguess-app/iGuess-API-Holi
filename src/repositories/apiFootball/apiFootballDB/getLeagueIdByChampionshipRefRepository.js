'use strict'

const ApiFootball = require('../../../models/apiFootballModel')

const getLeagueIdByChampionshipRefRepository = (request) => {
  const searchQuery = {
    currentChampionshipRef: request.championshipRef
  }
  
  return ApiFootball.find(searchQuery)
    .then((apiFootballList) => _convertToCleanObj(apiFootballList))
}

const _convertToCleanObj = (apiFootballList) => {
  if (apiFootballList.length) {
    return apiFootballList.map((apiFootballLeague) => apiFootballLeague.toJSON())
  }
  
  return apiFootballList
}

module.exports = getLeagueIdByChampionshipRefRepository