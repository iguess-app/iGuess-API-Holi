'use strict'

const moment = require('moment')
const selectLanguage = require('iguess-api-coincidents').Translate.gate.selectLanguage

const getEventsRepository = require('../../repositories/apiFootball/getEventsRepository')
const apiFootballGetEventsParser = require('../../parsers/apiFootballGetEventsParser')
const updateMatchDayResultsRepository = require('../../repositories/fixtures/updateMatchDayResultsRepository')
const getAllTeamsObj = require('./sharedFunctions/getAllTeamsObjFunction')

const updateMatchDayResults = (payload, headers) => {
  const dictionary = selectLanguage(headers.language)

  payload.dateFrom = moment().format('YYYY-MM-DD')
  payload.dateTo = moment().add(1, 'day').format('YYYY-MM-DD')
  payload.championshipRef = '5872a8d2ed1b02314e088291'

  return getEventsRepository(payload, dictionary, headers)
    .then((matchesEvents) => getAllTeamsObj(matchesEvents))
    .then((matchesEvents) => apiFootballGetEventsParser(matchesEvents))
    .then((matchesEvents) => _filteringTimeZoneDay(matchesEvents, payload.dateFrom))
    .then((matchesEvents) => _settingDateAndCallingRepository(matchesEvents, payload.dateFrom))
}

const _filteringTimeZoneDay = (matchesEvents, dateFrom) => {
  return matchesEvents.filter((match) => moment(match.initTime).format('YYYY-MM-DD') === dateFrom)
}

const _settingDateAndCallingRepository = (matchesEvents, dateFrom) => {
  const date = moment(dateFrom, 'YYYY-MM-DD').format()
  matchesEvents.date = date
  updateMatchDayResultsRepository(matchesEvents)
}


module.exports = updateMatchDayResults