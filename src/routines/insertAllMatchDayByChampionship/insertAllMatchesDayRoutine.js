'use strict'

const log = require('iguess-api-coincidents').Managers.logManager

const updateAllFixtureService = require('../../services/fixtures/updateAllFixtureService')

const ONE_SECOND = 1000
const FOUR_HOURS = ONE_SECOND * 60 * 60 * 4

const _startWorker = () => {
  log.info('==================> ROUTINE STARTED: update All match Schedule <==================')
  updateAllFixtureService()
}

setInterval(_startWorker, FOUR_HOURS)

_startWorker()