'use strict'

const coincidents = require('iguess-api-coincidents')

const Round = require('../../models/roundModel')

const log = coincidents.Managers.logManager

const insertNewMatchDayAtRoundsRepository = (newRounds, dictionary) => 

  newRounds.map((newRoundDay) =>
    Round.findOne({
      date: newRoundDay.date
    })
    .then((roundFound) => {
      if (!roundFound) {
        Round.create(newRoundDay)
          .catch((err) => {
            log.error(err)
          })
      }

      roundFound.games.map((game) => {
        newRoundDay.games.forEach((gameCOMPARE) => {
          if (gameCOMPARE.homeTeam.shortName === game.homeTeam.shortName) {
            game.initTime = gameCOMPARE.initTime
          }
        })

        return game
      })
      roundFound.save()
      log.info(`Round already setted (championshipRef: ${newRoundDay.championshipRef}, day: ${newRoundDay.date})`)
    })
  )

module.exports = insertNewMatchDayAtRoundsRepository