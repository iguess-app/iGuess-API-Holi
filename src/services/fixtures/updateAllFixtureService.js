'use strict'

const moment = require('moment')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const insertNewMatchDayAtRoundsRepository = require('../../repositories/fixtures/insertNewMatchDayAtRoundsRepository')
const getEventsRepository = require('../../repositories/apiFootball/getEventsRepository')
const apiFootballGetEventsParser = require('../../parsers/apiFootballGetEventsParser')
const getAllTeamsObj = require('./sharedFunctions/getAllTeamsObjFunction')

const insertAllMatches = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  payload.dateFrom = '2017-01-01' //moment().format('YYYY-MM-DD')
  payload.dateTo = '2017-12-25'
  payload.championshipRef = '5872a8d2ed1b02314e088291'

  return getEventsRepository(payload, dictionary, headers)
    .then((matchPerDay) => getAllTeamsObj(matchPerDay))
    .then((matchesEvents) => apiFootballGetEventsParser(matchesEvents))
    .then((matchesEvents) => _setMatchesPerDay(matchesEvents))
    .then((matchesEvents) => _buildNewRoundsObj(payload, dictionary, matchesEvents))
    .then((newRound) => insertNewMatchDayAtRoundsRepository(newRound, dictionary))
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

const _buildNewRoundsObj = (payload, dictionary, matchesEvents) => {
  const newRoundsObj = matchesEvents.map((matchDay) => {
    const newRound = {
      championshipRef: payload.championshipRef,
      date: moment(matchDay.date, 'DD/MM/YYYY').format(),
      unixDate: Number(moment(matchDay.date, 'DD/MM/YYYY').format('X')),
      games: matchDay.matches
    }
  
    return newRound
  })

  return newRoundsObj
}

module.exports = insertAllMatches