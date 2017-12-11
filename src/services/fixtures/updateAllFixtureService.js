'use strict'

const moment = require('moment')
const Promise = require('bluebird')

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
      })
    })
}

const _buildRequestToGetEvents = (championships) => {
  
  const promiseArray = championships.map((championship) => {
    const championshipFilteredObj = {}
    championshipFilteredObj.championshipRef = championship.id
    
    return getLeagueIdByChampionshipRefRepository(championshipFilteredObj)
  })
  
  return Promise.map(promiseArray, (leaguesObj, index) => 
    leaguesObj.map((leagueObj) => {
      leagueObj.dateFrom = moment(championships[index].date.initDate).format('YYYY-MM-DD')
      leagueObj.dateTo = moment(championships[index].date.finalDate).format('YYYY-MM-DD')

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
    const dateAlreadySettedIndex = acumulator.findIndex((matchDay) => matchDay.date === moment(match.initTime).format('DD/MM/YYYY'))

    if (dateAlreadySettedIndex >= 0) {
      acumulator[dateAlreadySettedIndex].matches.push(match)

      return acumulator
    }
    const newMatchDayObj = {
      date: moment(match.initTime).format('DD/MM/YYYY'),
      matches: [match]
    }
    acumulator.push(newMatchDayObj)

    return acumulator

  }, [])

  return matchPerDayArray
}

const _buildNewRoundsObj = (payload, matchesEvents) => {
  const newRoundsObj = matchesEvents.map((matchDay) => {
    const newRound = {
      championshipRef: payload.currentChampionshipRef,
      date: moment(matchDay.date, 'DD/MM/YYYY').format(),
      unixDate: Number(moment(matchDay.date, 'DD/MM/YYYY').format('X')),
      games: matchDay.matches
    }
  
    return newRound
  })

  return newRoundsObj
}

module.exports = insertAllMatches

/*Pega todos campeonatos ativos
  Pega o league_id dos cara para cada champeonato ativo
  Criar um objeto com o league_id e o range de data maximo do campeonato ativo para cada league_id de um campeonato*/