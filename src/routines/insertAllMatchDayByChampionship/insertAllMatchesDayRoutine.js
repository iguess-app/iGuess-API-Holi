'use strict'

const { log } = require('iguess-api-coincidents').Managers

const updateAllFixtureService = require('../../services/fixtures/updateAllFixtureService')

const FOUR_HOURS_IN_MILI_SECONDS = 144e5

const _startWorker = () => {
  log.info('==================> ROUTINE STARTED: update All match Schedule <==================')
  updateAllFixtureService()
}

setInterval(_startWorker, FOUR_HOURS_IN_MILI_SECONDS)

_startWorker()