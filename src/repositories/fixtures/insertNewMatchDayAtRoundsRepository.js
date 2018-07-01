'use strict'

const coincidents = require('iguess-api-coincidents')

const sharedFunctions = require('./sharedFunctions')
const Match = require('../../models/matchModel')

const { log } = coincidents.Managers

const insertNewMatchDayAtRoundsRepository = (leagueObj, matchesEvents) => 

  matchesEvents.map((match) => {
    const searchQuery = {
      matchRef: sharedFunctions.buildMatchRef(match, leagueObj)
    }

    return Match.findOne(searchQuery)
      .then((matchFound) => {
        if (!matchFound) {
          Match.create(_buildNewMatchObj(match, leagueObj))
            .catch((err) => log.error(err))
        }
        log.info(`Match already setted (championshipRef: ${leagueObj.currentChampionshipRef}, ${match.homeTeam.shortName} X ${match.awayTeam.shortName} [${match.initTime}])`)
        _updateMatchDataIfNeeds(matchFound, match)
      })
  }
  )

const _buildNewMatchObj = (match, leagueObj) => ({
  matchRef: sharedFunctions.buildMatchRef(match, leagueObj),
  championshipRef: leagueObj.currentChampionshipRef,
  initTime: match.initTime,
  homeTeam: match.homeTeam,
  awayTeam: match.awayTeam,
  homeTeamScore: match.homeTeamScore,
  awayTeamScore: match.awayTeamScore,
  started: match.started,
  ended: match.ended
})

const _updateMatchDataIfNeeds = (matchFound, match) => {
  if (!matchFound.manualForcedUpdate) {
    matchFound.homeTeamScore = match.homeTeamScore
    matchFound.awayTeamScore = match.awayTeamScore
    matchFound.ended = match.ended
    matchFound.started = match.started
    matchFound.initTime = match.initTime
    if (match.minutes) {
      matchFound.minutes = match.minutes
    }
    matchFound.save()
  }
}

module.exports = insertNewMatchDayAtRoundsRepository