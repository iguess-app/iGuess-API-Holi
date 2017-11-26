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
      log.info(`Round already setted (championshipRef: ${newRoundDay.championshipRef}, day: ${newRoundDay.date})`)
    })
  )

module.exports = insertNewMatchDayAtRoundsRepository