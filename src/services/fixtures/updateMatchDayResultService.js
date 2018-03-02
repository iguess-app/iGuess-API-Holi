'use strict'

const moment = require('moment')
const Promise = require('bluebird')
const log = require('iguess-api-coincidents').Managers.logManager

const getEventsRepository = require('../../repositories/apiFootball/getEventsRepository')
const apiFootballGetEventsParser = require('../../parsers/apiFootballGetEventsParser')
const updateMatchDayResultsRepository = require('../../repositories/fixtures/updateMatchDayResultsRepository')
const getAllTeamsObj = require('./sharedFunctions/getAllTeamsObjFunction')
const getLeagueIdByChampionshipRefRepository = require('../../repositories/apiFootball/apiFootballDB/getLeagueIdByChampionshipRefRepository')
const getAllChampionshipRepository = require('../../repositories/championship/getAllChampionshipRepository')

const updateMatchDayResults = () => {
  const onlyActiveObj = { onlyActive: true }
  
  return getAllChampionshipRepository(onlyActiveObj)
    .then((championships) => _buildRequestToGetEvents(championships))
    .then((simpleArrayWithAllApiFootballLeagueObj) => {
      simpleArrayWithAllApiFootballLeagueObj.forEach((apiFootballLeagueObj) => 
        getEventsRepository(apiFootballLeagueObj)
        .then((matchesEvents) => getAllTeamsObj(matchesEvents))
        .then((matchesEvents) => apiFootballGetEventsParser(matchesEvents))
        .then((matchesEvents) => _filteringTimeZoneDay(matchesEvents, apiFootballLeagueObj.dateFrom))
        .then((matchesEvents) => _settingDateAndCallingRepository(matchesEvents, apiFootballLeagueObj))
        .catch((err) => log.error(err))
      )
    })
    .catch((err) => log.error(err))
}

const _buildRequestToGetEvents = (championships) => {
  const promiseArray = championships.map((championship) => {
    const championshipFilteredObj = {}
    championshipFilteredObj.championshipRef = championship.id

    return getLeagueIdByChampionshipRefRepository(championshipFilteredObj)
  })
  
  return Promise.map(promiseArray, (leaguesObj) => _addDatesToObj(leaguesObj))
    .then((arrayOfArrayOfLeagueObj) => _joinToAOnlyArray(arrayOfArrayOfLeagueObj))
} 

const _addDatesToObj = (leaguesObj) => 
  leaguesObj.map((leagueObj) => {
    leagueObj.dateFrom = moment().format('YYYY-MM-DD')
    leagueObj.dateTo = moment().add(1, 'day').format('YYYY-MM-DD')

    return leagueObj
  })

const _joinToAOnlyArray = (arrayOfArrayOfLeagueObj) => {
  const simpleArrayWithAllApiFootballLeagueObj = []
  arrayOfArrayOfLeagueObj.map((arrayOfLeagueObj) => arrayOfLeagueObj.map((leagueObj) => simpleArrayWithAllApiFootballLeagueObj.push(leagueObj)))

  return simpleArrayWithAllApiFootballLeagueObj
}

const _filteringTimeZoneDay = (matchesEvents, dateFrom) => {
  return matchesEvents.filter((match) => moment(match.initTime).format('YYYY-MM-DD') === dateFrom)
}

const _settingDateAndCallingRepository = (matchesEvents, apiFootballLeagueObj) => {
  const date = moment(apiFootballLeagueObj.dateFrom, 'YYYY-MM-DD').format()
  matchesEvents.date = date
  updateMatchDayResultsRepository(matchesEvents, apiFootballLeagueObj)
}

module.exports = updateMatchDayResults