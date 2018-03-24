'use strict'

const Promise = require('bluebird')
const { dateManager, log } = require('iguess-api-coincidents').Managers

const insertNewMatchDayAtRoundsRepository = require('../../repositories/fixtures/insertNewMatchDayAtRoundsRepository')
const getEventsRepository = require('../../repositories/apiFootball/getEventsRepository')
const getAllChampionshipRepository = require('../../repositories/championship/getAllChampionshipRepository')
const getLeagueIdByChampionshipRefRepository = require('../../repositories/apiFootball/apiFootballDB/getLeagueIdByChampionshipRefRepository')
const apiFootballGetEventsParser = require('../../parsers/apiFootballGetEventsParser')
const getAllTeamsObj = require('./sharedFunctions/getAllTeamsObjFunction')

const insertAllMatches = () => {
  const onlyActiveObj = { onlyActive: true }

  return getAllChampionshipRepository(onlyActiveObj)
    .then((championships) => _buildRequestToGetEvents(championships))
    .then((simpleArrayWithAllApiFootballLeagueObj) => {
      simpleArrayWithAllApiFootballLeagueObj.forEach((apiFootballLeagueObj) => {
        getEventsRepository(apiFootballLeagueObj)
          .then((matchPerDay) => getAllTeamsObj(matchPerDay))
          .then((matchesEvents) => apiFootballGetEventsParser(matchesEvents))
          .then((matchesEvents) => insertNewMatchDayAtRoundsRepository(apiFootballLeagueObj, matchesEvents))
          .catch((err) => log.error(err))
      })
    })
    .catch((err) => log.error(err))
}

const _buildRequestToGetEvents = (championships) => {
  const promiseArray = championships.map((championship) => {
    const championshipFilteredObj = {}
    championshipFilteredObj.championshipRef = championship.id
    
    return getLeagueIdByChampionshipRefRepository(championshipFilteredObj)
  })
  
  return Promise.map(promiseArray, (leaguesObj, index) => 
    leaguesObj.map((leagueObj) => {
      leagueObj.dateFrom = dateManager.getDate(championships[index].date.initDate, '', 'YYYY-MM-DD')
      leagueObj.dateTo = dateManager.getDate(championships[index].date.finalDate, '', 'YYYY-MM-DD')

      return leagueObj
    })
  ).then((arrayOfArrayOfLeagueObj) => _joinToAOnlyArray(arrayOfArrayOfLeagueObj))
}

const _joinToAOnlyArray = (arrayOfArrayOfLeagueObj) => {
  const simpleArrayWithAllApiFootballLeagueObj = []
  arrayOfArrayOfLeagueObj.map((arrayOfLeagueObj) => arrayOfLeagueObj.map((leagueObj) => simpleArrayWithAllApiFootballLeagueObj.push(leagueObj)))

  return simpleArrayWithAllApiFootballLeagueObj
}

module.exports = insertAllMatches