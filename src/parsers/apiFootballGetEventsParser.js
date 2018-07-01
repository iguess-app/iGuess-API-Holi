'use strict'

const { dateManager } = require('iguess-api-coincidents').Managers

const MINUTES_END_MATCH = 90
const HUNDRED_PERCENT = 100
const DECIMAL_BASE = 10
const POSITION_ZERO = 0
const POSITION_ONE = 1

const apiFootballGetEventsParser = (matchesEvents) =>
  matchesEvents.map((match) => {
    const matchObj = {
      initTime: dateManager.convertAPIFootballToUTC(match.match_date+match.match_time, 'YYYY-MM-DDHH:mm'),
      ended: _getIfEnded(match),
      homeTeam: match.homeTeamObj,
      awayTeam: match.awayTeamObj,
      started: _getIfStarted(match),
      minutes: 0,
      percentageCompleted: 0
    }

    if (_matchIsLive(matchObj)) {
      matchObj.minutes = _getMinutesInteger(match.match_status)
      matchObj.percentageCompleted = _getPercentageCompleted(matchObj.minutes)
    }

    if (match.match_hometeam_score !== '' && match.match_hometeam_score !== '?') {
      matchObj.homeTeamScore = match.match_hometeam_score
      matchObj.awayTeamScore = match.match_awayteam_score
    }

    return matchObj
  })

const _getIfStarted = (match) => match.match_status !== ''

const _getIfEnded = (match) => match.match_status === 'FT' || match.match_status === 'AET'

const _matchIsLive = (matchObj) => matchObj.started && !matchObj.ended

const _getMinutesInteger = (minutesString) => {
  if (minutesString.includes('+')) {
    const minutesSplitted = minutesString.split('+')

    return parseInt(minutesSplitted[POSITION_ZERO], DECIMAL_BASE) + parseInt(minutesSplitted[POSITION_ONE], DECIMAL_BASE)
  }

  return parseInt(minutesString.split('\'')[POSITION_ZERO], DECIMAL_BASE)
}

const _getPercentageCompleted = (minutes) => {
  const percentage = minutes * HUNDRED_PERCENT / MINUTES_END_MATCH
  if (percentage > HUNDRED_PERCENT) {
    return HUNDRED_PERCENT
  }

  return percentage
}

module.exports = apiFootballGetEventsParser