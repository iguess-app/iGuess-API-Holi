'use strict'

const moment = require('moment')

const apiFootballGetEventsParser = (matchesEvents) =>
  matchesEvents.map((match) => {
    const matchObj = {
      initTime: _parseToIsoDateUTCFormat(match),
      ended: _getIfEnded(match),
      homeTeam: match.homeTeamObj,
      awayTeam: match.awayTeamObj,
      started: _getIfStarted(match)
    }

    _matchIsLive(matchObj) ? matchObj.minutes = match.match_status : ''

    if (match.match_hometeam_score !== '' && match.match_hometeam_score !== '?') {
      matchObj.homeTeamScore = match.match_hometeam_score
      matchObj.awayTeamScore = match.match_awayteam_score
    }

    return matchObj
  })

const _parseToIsoDateUTCFormat = (match) => moment(`${match.match_date}${match.match_time}Z`, 'YYYY-MM-DDHH:mmZ').utc().format()

const _getIfStarted = (match) => match.match_status !== ''

const _getIfEnded = (match) => match.match_status === 'FT'

const _matchIsLive = (matchObj) => matchObj.started && !matchObj.ended

module.exports = apiFootballGetEventsParser