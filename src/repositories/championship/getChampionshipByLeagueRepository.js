'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const Round = app.src.models.roundModel;
  const Championship = app.src.models.championshipModel;

  const getChampionshipByLeague = (reqBody) => _findChampionshipByLeague(reqBody)

  const _findChampionshipByLeague = (reqBody) => 
    Championship.find({ 'league': reqBody.league })
    .catch((err) => Boom.badData(err))
    
  return {
    getChampionshipByLeague
  }
}