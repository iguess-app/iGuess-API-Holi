'use strict'

const updateAllFixtureService = require('../../services/fixtures/updateAllFixtureService')

const SEVEN_SECONDS = 7000
const ONE_HOUR = 1000 * 60 * 60

const _startWorker = () => {
  updateAllFixtureService({}, {language: 'en-us'})
}

setInterval(_startWorker, SEVEN_SECONDS)