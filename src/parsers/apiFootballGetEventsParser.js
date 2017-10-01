'use strict'

const moment = require('moment')
const momentTimezone = require('moment-timezone')

const TIMEZONE_DIFF_FROM_API_FOOTBALL = 5

//TODO: Ao inves de dar subtract 5 horas, da um parse timezone brasilia ou SP

const apiFootballGetEventsParser = (matchesEvents) => {
  return matchesEvents.map((match) => {
    const matchObj = {
      initTime: moment(match.match_date+match.match_time, 'YYYY-MM-DDHH:mm').subtract(TIMEZONE_DIFF_FROM_API_FOOTBALL, 'hours').format(),
      ended: match.match_status === 'FT',
      homeTeam: match.homeTeamObj,
      awayTeam: match.awayTeamObj
    }

    if (match.match_hometeam_score !== '' && match.match_hometeam_score !== '?') {
      matchObj.homeTeamScore = match.match_hometeam_score
      matchObj.awayTeamScore = match.match_awayteam_score
    }

    return matchObj
  })
}

module.exports = apiFootballGetEventsParser