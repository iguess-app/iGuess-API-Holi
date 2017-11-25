'use strict'

const updateMatchDayResultRoutine = require('./updateMatchDayResults/updateMatchDayResultRoutine')
const insertAllMatchesDayRoutine = require('./insertAllMatchDayByChampionship/insertAllMatchesDayRoutine')

module.exports = {
  updateMatchDayResultRoutine,
  insertAllMatchesDayRoutine
}