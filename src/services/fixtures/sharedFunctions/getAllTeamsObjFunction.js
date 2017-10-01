'use strict'

const Promise = require('bluebird')

const getTeamsByApiFootballNameRepository = require('../../../repositories/teams/getTeamsByApiFootballNameRepository')

const getAllTeamsObj = (matchesEvents) => {

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

module.exports = getAllTeamsObj

/*eslint no-magic-numbers: 0*/