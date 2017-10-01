'use strict'

const Round = require('../../models/roundModel')

const updateMatchDayResultsRepository = (matchDayEvents, dictionary) => 

    Round.findOne({
      date: matchDayEvents.date
    })
    .then((roundFound) => {
      matchDayEvents.forEach((match) => {
        if (match.ended) {
          const matchFoundIndex = roundFound.games.findIndex((matchFromDB) => 
            matchFromDB.homeTeam.apiFootballName === match.homeTeam.apiFootballName &&
            matchFromDB.awayTeam.apiFootballName === match.awayTeam.apiFootballName
          )

          if (matchFoundIndex >= 0) {
            roundFound.games[matchFoundIndex].homeTeamScore = match.homeTeamScore
            roundFound.games[matchFoundIndex].awayTeamScore = match.awayTeamScore
            roundFound.games[matchFoundIndex].ended = match.ended
          }
        }
      })

      roundFound.save()
    })

module.exports = updateMatchDayResultsRepository