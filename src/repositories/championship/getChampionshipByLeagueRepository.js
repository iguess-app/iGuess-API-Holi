'use strict'

const Boom = require('boom')

const Championship = require('../../models/championshipModel')
const Round = require('../../models/roundModel')
const QueryUtils = require('iguess-api-coincidents').Utils.queryUtils

const getChampionshipByLeague = (reqBody) => _findChampionshipByLeague(reqBody)

const _findChampionshipByLeague = (reqBody) => 
  Championship.find({ 'league': reqBody.league })
  .catch((err) => Boom.badData(err))

module.exports = getChampionshipByLeague