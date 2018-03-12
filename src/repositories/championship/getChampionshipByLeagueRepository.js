'use strict'

const Boom = require('boom')

const Championship = require('../../models/championshipModel')

const getChampionshipByLeague = (reqBody) => _findChampionshipByLeague(reqBody)

const _findChampionshipByLeague = (reqBody) => 
  Championship.find({ 'league': reqBody.league })
  .catch((err) => Boom.badData(err))

module.exports = getChampionshipByLeague