'use strict'

const Round = require('../../models/roundModel')

const EXISTENT_INDEX = 0

const updateMatchDayResultsRepository = (matchDayEvents, apiFootballLeagueObj) =>
  Round.findOne({
    date: matchDayEvents.date,
    championshipRef: apiFootballLeagueObj.currentChampionshipRef
  })
  .then((roundFound) => {
    matchDayEvents.forEach((match) => {
      const matchFoundIndex = roundFound.games.findIndex((matchFromDB) =>
        matchFromDB.homeTeam.apiFootballName === match.homeTeam.apiFootballName &&
        matchFromDB.awayTeam.apiFootballName === match.awayTeam.apiFootballName
      )

      if (matchFoundIndex >= EXISTENT_INDEX) {
        roundFound.games[matchFoundIndex].homeTeamScore = match.homeTeamScore
        roundFound.games[matchFoundIndex].awayTeamScore = match.awayTeamScore
        roundFound.games[matchFoundIndex].ended = match.ended
        roundFound.games[matchFoundIndex].started = match.started
        if (match.minutes) {
          match.minutes = roundFound.games[matchFoundIndex].minutes = match.minutes
        }
      }
    })

    roundFound.save()
  })

module.exports = updateMatchDayResultsRepository