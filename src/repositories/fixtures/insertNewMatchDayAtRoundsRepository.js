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
      .then((roundFound) => {
        if (!roundFound) {
          Match.create(_buildNewMatchObj(match, leagueObj))
            .catch((err) => log.error(err))
        }
        log.info(`Match already setted (championshipRef: ${leagueObj.currentChampionshipRef}, ${match.homeTeam.shortName} X  ${match.awayTeam.shortName} [${match.initTime}])`)
      })
  }
  )

const _buildNewMatchObj = (match, leagueObj) => ({
  'matchRef': sharedFunctions.buildMatchRef(match, leagueObj),
  'championshipRef': leagueObj.currentChampionshipRef,
  'initTime': match.initTime,
  'homeTeam': match.homeTeam,
  'awayTeam': match.awayTeam,
  'homeTeamScore': match.homeTeamScore,
  'awayTeamScore': match.awayTeamScore,
  'started': match.started,
  'ended': match.ended
})

module.exports = insertNewMatchDayAtRoundsRepository