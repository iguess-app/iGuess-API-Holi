'use strict'

const updateAllFixtureService = require('../../services/fixtures/updateAllFixtureService')

const ONE_SECOND = 1000
const FOUR_HOURS = ONE_SECOND * 60 * 60 * 4

const _startWorker = () => {
  updateAllFixtureService({}, {language: 'en-us'})
}

setInterval(_startWorker, FOUR_HOURS)