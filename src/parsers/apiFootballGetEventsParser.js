'use strict'

const moment = require('moment')

const apiFootballGetEventsParser = (matchesEvents) =>
  matchesEvents.map((match) => {
    const matchObj = {
      initTime: moment(`${match.match_date}${match.match_time}Z`, 'YYYY-MM-DDHH:mmZ').utc().format(),
      ended: match.match_status === 'FT',
      homeTeam: match.homeTeamObj,
      awayTeam: match.awayTeamObj,
      started: _getIfStarted(match)
    }

    if (matchObj.started && !matchObj.ended) {
      matchObj.minutes = match.match_status
    }

    if (match.match_hometeam_score !== '' && match.match_hometeam_score !== '?') {
      matchObj.homeTeamScore = match.match_hometeam_score
      matchObj.awayTeamScore = match.match_awayteam_score
    }

    return matchObj
  })

const _getIfStarted = (match) => match.match_status !== ''

module.exports = apiFootballGetEventsParser