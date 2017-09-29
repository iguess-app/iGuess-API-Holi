'use strict'

const Promise = require('bluebird')
const moment = require('moment')

const getEventsRepository = require('../../repositories/apiFootball/getEventsRepository')
const apiFootballGetEventsParser = require('../../parsers/apiFootballGetEventsParser')

module.exports = (app) => {
  const getTeamsByApiFootballNameRepository = app.src.repositories.teams.getTeamsByApiFootballNameRepository
  const insertNewMatchDayAtRoundsRepository = app.src.repositories.fixtures.insertNewMatchDayAtRoundsRepository
  
  const insertAllMatches = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    payload.dateFrom = '2017-01-01'
    payload.dateTo = '2017-31-12'
    payload.championshipRef = '5872a8d2ed1b02314e088291'

    return getEventsRepository(payload, dictionary)
      .then((matchesEvents) => _getAllTeamsObj(matchesEvents, getTeamsByApiFootballNameRepository))
      .then((matchesEvents) => apiFootballGetEventsParser(matchesEvents))
      .then((matchesEvents) => _buildNewRoundObj(payload, dictionary, matchesEvents))
      .then((newRound) => insertNewMatchDayAtRoundsRepository(newRound, dictionary))
  }

  return {
    insertAllMatches
  }
}


const _getAllTeamsObj = (matchesEvents, getTeamsByApiFootballNameRepository) => {
  const matchPerDay = matchesEvents.reduce((acumulator, match) => {
    const dateAlreadySettedIndex = acumulator.findIndex((matchDay) => matchDay.date === match.match_date)

    if (dateAlreadySettedIndex >= 0) {
      acumulator[dateAlreadySettedIndex].matches.push(match)
      return acumulator
    }
    const newMatchDayObj = {
      date: match.match_date,
      matches: [match]
    }
    acumulator.push(newMatchDayObj)

    return acumulator

  }, [])
  
  return matchPerDay.map((matchDay) => 

    Promise.map(matchDay.matches.map((match) => {
      const getTeamsPromiseArray = Promise.all([
        getTeamsByApiFootballNameRepository.getTeams(match.match_hometeam_name),
        getTeamsByApiFootballNameRepository.getTeams(match.match_awayteam_name), 
        match
      ])

      return Promise.map(getTeamsPromiseArray, (team) => {
        const homeTeamObj = team[0]
        const awayTeamObj = team[1]
        const matchObj = team[2]
        homeTeamObj.teamRef = homeTeamObj._id
        awayTeamObj.teamRef = awayTeamObj._id
        Reflect.deleteProperty(homeTeamObj, 'apiFootballName')
        Reflect.deleteProperty(awayTeamObj, 'apiFootballName')
        matchObj.match_hometeam_obj = homeTeamObj
        matchObj.match_awayteam_obj = awayTeamObj
        
        return matchObj
      })
    })
  ), (justReturn) => 
    justReturn
  )
}

const _buildNewRoundObj = (payload, dictionary, matchesEvents) => {
  const newRound = {
    championshipRef: payload.championshipRef,
    date:  moment(payload.date, 'YYYY-MM-DD').format(),
    unixDate: moment(payload.date, 'YYYY-MM-DD').format('X'),
    games: matchesEvents
  }

  return newRound
}