'use strict'

const sharedFunctions = require('./sharedFunctions')
const Match = require('../../models/matchModel')

const updateMatchDayResultsRepository = (matchEvents, leagueObj) => {
  matchEvents.forEach((match) => {
    const searchQuery = {
      matchRef: sharedFunctions.buildMatchRef(match, leagueObj)
    }

    return Match.findOne(searchQuery)
      .then((matchFound) => {
          if (matchFound) {
            matchFound.homeTeamScore = match.homeTeamScore
            matchFound.awayTeamScore = match.awayTeamScore
            matchFound.ended = match.ended
            matchFound.started = match.started
            if (match.minutes) {
              match.minutes = matchFound.minutes = match.minutes
            }
          }
        matchFound.save()
      })
  })
}


module.exports = updateMatchDayResultsRepository