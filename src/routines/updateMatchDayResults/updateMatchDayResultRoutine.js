'use strict'

const coincidents = require('iguess-api-coincidents')

const updateMatchDayResultService = require('../../services/fixtures/updateMatchDayResultService')

const log = coincidents.Managers.logManager
const Config = coincidents.Config

const _startMatchDayResultWorker = () => {
  log.info('==================> ROUTINE STARTED: update Match Day Results <==================')
  updateMatchDayResultService()
}
setInterval(_startMatchDayResultWorker, Config.apiFootball.intervalBetweenRequests)

//TODO: Criar regra para pegar por campeonato e somente em dias e horarios dos jogos