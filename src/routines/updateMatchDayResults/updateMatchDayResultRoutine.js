'use strict'

const updateMatchDayResultService = require('../../services/fixtures/updateMatchDayResultService')

const SEVEN_SECONDS = 7000
const ONE_HOUR = 1000 * 60 * 60

const _startMatchDayResultWorker = () => {
  //TODO: Criar regra para pegar por campeonato e somente em dias e horarios dos jogos
  updateMatchDayResultService({}, {language: 'en-us'})
}

setInterval(_startMatchDayResultWorker, ONE_HOUR)