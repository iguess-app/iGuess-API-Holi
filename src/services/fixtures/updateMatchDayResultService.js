'use strict'

const Promise = require('bluebird')
const coincidents = require('iguess-api-coincidents')

const getEventsRepository = require('../../repositories/apiFootball/getEventsRepository')
const apiFootballGetEventsParser = require('../../parsers/apiFootballGetEventsParser')
const updateMatchDayResultsRepository = require('../../repositories/fixtures/updateMatchDayResultsRepository')
const getAllTeamsObj = require('./sharedFunctions/getAllTeamsObjFunction')
const getLeagueIdByChampionshipRefRepository = require('../../repositories/apiFootball/apiFootballDB/getLeagueIdByChampionshipRefRepository')
const getAllChampionshipRepository = require('../../repositories/championship/getAllChampionshipRepository')

const config = coincidents.Config
const { dateManager, log } = coincidents.Managers

const updateMatchDayResults = () => {
  const onlyActiveObj = { onlyActive: true }

  return getAllChampionshipRepository(onlyActiveObj)
    .then((championships) => _buildRequestToGetEvents(championships))
    .then((simpleArrayWithAllApiFootballLeagueObj) => {
      simpleArrayWithAllApiFootballLeagueObj.forEach((apiFootballLeagueObj) =>
        getEventsRepository(apiFootballLeagueObj)
        .then((matchesEvents) => getAllTeamsObj(matchesEvents))
        .then((matchesEvents) => apiFootballGetEventsParser(matchesEvents))
        .then((matchesEvents) => updateMatchDayResultsRepository(matchesEvents, apiFootballLeagueObj))
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

const _addDatesToObj = (leaguesObj) => {
  const forcedDate = config.updateMatchResultRoutine

  return leaguesObj.map((leagueObj) => {
    const UTC_TODAY = dateManager.getUTCNow('YYYY-MM-DD')
    const UTC_TOMMORROW = dateManager.addOneDayMore(UTC_TODAY, 'YYYY-MM-DD', 'YYYY-MM-DD')
    const UTC_YESTERDAY = dateManager.setOneDayLess(UTC_TODAY, 'YYYY-MM-DD', 'YYYY-MM-DD')
    leagueObj.dateFrom = forcedDate.dateFromForced || UTC_YESTERDAY
    leagueObj.dateTo = forcedDate.dateToForced || UTC_TOMMORROW

    return leagueObj
  })
}

const _joinToAOnlyArray = (arrayOfArrayOfLeagueObj) => {
  const simpleArrayWithAllApiFootballLeagueObj = []
  arrayOfArrayOfLeagueObj.map((arrayOfLeagueObj) => arrayOfLeagueObj.map((leagueObj) => simpleArrayWithAllApiFootballLeagueObj.push(leagueObj)))

  return simpleArrayWithAllApiFootballLeagueObj
}

module.exports = updateMatchDayResults