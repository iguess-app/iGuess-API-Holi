'use strict'

const log = require('iguess-api-coincidents').Managers.logManager

const updateMatchDayResultService = require('../../services/fixtures/updateMatchDayResultService')

const SEVEN_SECONDS = 7000
const FIFTHTEEN_SECONDS = 15000

const _startMatchDayResultWorker = () => {
  log.info('==================> ROUTINE STARTED: update Match Day Results <==================')
  //TODO: Criar regra para pegar por campeonato e somente em dias e horarios dos jogos
  updateMatchDayResultService({}, {
    language: 'en-us'
  })
}

//setInterval(_startMatchDayResultWorker, FIFTHTEEN_SECONDS)