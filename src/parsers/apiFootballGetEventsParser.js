'use strict'

const moment = require('moment')

const apiFootballGetEventsParser = (matchesEvents) => {
  return matchesEvents.map((match) => {
    const matchObj = {
      initTime: moment(match.match_date+match.match_time, 'YYYY-MM-DDHH:mm').subtract(5, 'hours').format(),
      homeTeam: match.match_hometeam_obj,
      awayTeam: match.match_awayteam_obj,
      ended: match.match_status === 'FT'
    }

    if (match.match_hometeam_score !== '') {
      matchObj.homeTeamScore = match.match_hometeam_score,
      matchObj.awayTeamScore = match.match_awayteam_score
    }

    return matchObj
  })
}

module.exports = apiFootballGetEventsParser