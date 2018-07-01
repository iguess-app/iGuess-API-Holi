'use strict'

const sharedFunctions = require('./sharedFunctions')
const Match = require('../../models/matchModel')

const updateMatchDayResultsRepository = (matchEvents, leagueObj) => {
  matchEvents.forEach((match) => {
    const searchQuery = {
      matchRef: sharedFunctions.buildMatchRef(match, leagueObj)
    }

    return Match.findOne(searchQuery)
      .then((matchFound) => _updateMatch(matchFound, match))
  })
}

const _updateMatch = (matchFound, match) => {
  if (matchFound && !matchFound.manualForcedUpdate) {
    matchFound.homeTeamScore = match.homeTeamScore
    matchFound.awayTeamScore = match.awayTeamScore
    matchFound.ended = match.ended
    matchFound.started = match.started
    matchFound.initTime = match.initTime
    if (match.minutes) {
      matchFound.minutes = match.minutes
      matchFound.percentageCompleted = match.percentageCompleted
    }
  }
  matchFound.save()
}

module.exports = updateMatchDayResultsRepository