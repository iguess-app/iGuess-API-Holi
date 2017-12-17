'use strict'

const Round = require('../../models/roundModel')

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

      if (matchFoundIndex >= 0) {
        roundFound.games[matchFoundIndex].homeTeamScore = match.homeTeamScore
        roundFound.games[matchFoundIndex].awayTeamScore = match.awayTeamScore
        roundFound.games[matchFoundIndex].ended = match.ended
      }
    })

    roundFound.save()
  })

module.exports = updateMatchDayResultsRepository