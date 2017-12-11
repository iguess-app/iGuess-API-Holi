'use strict'

const coincidents = require('iguess-api-coincidents')

const Round = require('../../models/roundModel')

const log = coincidents.Managers.logManager

const insertNewMatchDayAtRoundsRepository = (newRounds) => 

  newRounds.map((newRoundDay) => {
    const searchQuery = {
      unixDate: newRoundDay.unixDate
    }

    return Round.findOne(searchQuery)
      .then((roundFound) => {
        if (!roundFound) {
          Round.create(newRoundDay)
            .catch((err) => {
              log.error(err)
            })
        }
        log.info(`Round already setted (championshipRef: ${newRoundDay.championshipRef}, day: ${newRoundDay.date})`)
      })
  }
  )

module.exports = insertNewMatchDayAtRoundsRepository