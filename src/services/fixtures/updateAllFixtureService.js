/*
  README 
  STEPS
  * Get all Actives Championships
  * Get all 'league_id' by active championship
  * Create the range date based in initDate and finalDate to each championship
  * Do the requests to apiFootball
  * Get teams obj from DB according to apiFootball teams names
  * Parsing response
  * Join matches by day
  * Create a model obj to insert at Round collection
*/

'use strict'

const Promise = require('bluebird')
const { dateManager, log } = require('iguess-api-coincidents').Managers

const EXISTENT_INDEX = 0

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
          .then((matchesEvents) => _setMatchesPerDay(matchesEvents))
          .then((matchesEvents) => _buildNewRoundsObj(apiFootballLeagueObj, matchesEvents))
          .then((newRound) => insertNewMatchDayAtRoundsRepository(newRound))
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
      leagueObj.dateFrom = dateManager.getUTCDate(championships[index].date.initDate, '', 'YYYY-MM-DD')
      leagueObj.dateTo = dateManager.getUTCDate(championships[index].date.finalDate, '', 'YYYY-MM-DD')

      return leagueObj
    })
  ).then((arrayOfArrayOfLeagueObj) => _joinToAOnlyArray(arrayOfArrayOfLeagueObj))
}


const _joinToAOnlyArray = (arrayOfArrayOfLeagueObj) => {
  const simpleArrayWithAllApiFootballLeagueObj = []
  arrayOfArrayOfLeagueObj.map((arrayOfLeagueObj) => arrayOfLeagueObj.map((leagueObj) => simpleArrayWithAllApiFootballLeagueObj.push(leagueObj)))

  return simpleArrayWithAllApiFootballLeagueObj
}

const _setMatchesPerDay = (matchesEvents) => {
  const matchPerDayArray = matchesEvents.reduce((acumulator, match) => {
    const dateAlreadySettedIndex = acumulator.findIndex((matchDay) => 
      matchDay.date === dateManager.getUTCDate(match.initTime, '', 'DD/MM/YYYY')
    )

    if (dateAlreadySettedIndex >= EXISTENT_INDEX) {
      acumulator[dateAlreadySettedIndex].matches.push(match)

      return acumulator
    }
    const newMatchDayObj = {
      date: dateManager.getUTCDate(match.initTime, '', 'DD/MM/YYYY'),
      matches: [match]
    }
    acumulator.push(newMatchDayObj)

    return acumulator

  }, [])

  return matchPerDayArray
}

const _buildNewRoundsObj = (payload, matchesEvents) => {
  const newRoundsObj = matchesEvents.map((matchDay) => {
    const UNIX_DATE_ALIAS = 'X'
    const newRound = {
      championshipRef: payload.currentChampionshipRef,
      date: dateManager.getUTCDate(matchDay.date, 'DD/MM/YYYY'),
      unixDate: Number(dateManager.getUTCDate(matchDay.date, 'DD/MM/YYYY', UNIX_DATE_ALIAS)),
      games: matchDay.matches
    }
  
    return newRound
  })

  return newRoundsObj
}

module.exports = insertAllMatches