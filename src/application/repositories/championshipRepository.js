'use Strict';

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const QueryUtils = app.src.utils.queryUtils;
  const Round = app.src.schemas.roundSchema;
  const Championship = app.src.schemas.championshipSchema;

  const getLastRound = (reqBody) => _findLastRound(reqBody)

  const getChampionshipByLeague = (reqBody) => _findChampionshipByLeague(reqBody)

  const _findLastRound = (reqBody) => 
    Promise.resolve(Round
      .findOne({ 'championship': reqBody.championship })
      .sort('-fixture')
      .then((lastRound) => lastRound)
      .catch((err) => Boom.badData(err))
    )
  
  const _findChampionshipByLeague = (reqBody) => 
    Promise.resolve(Championship
    .findOne({ 'league': reqBody.league })
    .then((championships) => QueryUtils.makeObject(championships))
    .catch((err) => Boom.badData(err))
    )

  return {
    getLastRound,
    getChampionshipByLeague
  }
}