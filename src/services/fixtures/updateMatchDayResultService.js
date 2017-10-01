'use strict'

const Promise = require('bluebird')
const moment = require('moment')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage
const log = require('iguess-api-coincidents').Managers.logManager

const getTeamsByApiFootballNameRepository = require('../../repositories/teams/getTeamsByApiFootballNameRepository')
const getEventsRepository = require('../../repositories/apiFootball/getEventsRepository')
const apiFootballGetEventsParser = require('../../parsers/apiFootballGetEventsParser')
const updateMatchDayResultsRepository = require('../../repositories/fixtures/updateMatchDayResultsRepository')

const updateMatchDayResults = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  payload.dateFrom = moment().format('YYYY-MM-DD')
  payload.dateTo = moment().add(1, 'day').format('YYYY-MM-DD')
  payload.championshipRef = '5872a8d2ed1b02314e088291'

  return getEventsRepository(payload, dictionary, headers)
    .then((matchesEvents) => _getAllTeamsObj(matchesEvents))
    .then((matchesEvents) => apiFootballGetEventsParser(matchesEvents))
    .then((matchesEvents) => _splitingTimeZoneDays(matchesEvents, payload.dateFrom))
    .then((matchesEvents) => _ggEasy(matchesEvents, payload.dateFrom))
}

const _getAllTeamsObj = (matchesEvents) => {

  const matchesEventsWithTeamsObj = matchesEvents.map((match) => {
    const getTeamsPromiseArray = Promise.all([
      getTeamsByApiFootballNameRepository(match.match_hometeam_name),
      getTeamsByApiFootballNameRepository(match.match_awayteam_name),
      match
    ])

    return getTeamsPromiseArray
  })

  return Promise.map(matchesEventsWithTeamsObj, (team) => {
    const homeTeamObj = team[0]
    const awayTeamObj = team[1]
    const matchObj = team[2]
    homeTeamObj.teamRef = homeTeamObj._id
    awayTeamObj.teamRef = awayTeamObj._id
    matchObj.homeTeamObj = homeTeamObj
    matchObj.awayTeamObj = awayTeamObj

    return matchObj
  })
}

const _splitingTimeZoneDays = (matchesEvents, dateFrom) => {
  return matchesEvents.filter((match) => moment(match.initTime).format('YYYY-MM-DD') === dateFrom)
}

const _ggEasy = (matchesEvents, dateFrom) => {
  const date = moment(dateFrom, 'YYYY-MM-DD').format()
  matchesEvents.date = date
  log.info(matchesEvents)
  updateMatchDayResultsRepository(matchesEvents)
}


module.exports = updateMatchDayResults