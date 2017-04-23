'use Strict';

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const Round = app.coincidents.Schemas.roundSchema;
  const Championship = app.coincidents.Schemas.championshipSchema;

  const championshipById = (id) =>
    Championship.findOne({_id: id}) 
      .then((championship) => QueryUtils.makeObject(championship))

  const getLastRound = (reqBody) => _findLastRound(reqBody)

  const getChampionshipByLeague = (reqBody) => _findChampionshipByLeague(reqBody)

  const getFixtureByNumber = (reqBody) => _findFixtureChosen(reqBody)

  const _findLastRound = (reqBody) => 
    Promise.resolve(Round
      .findOne({ 'championship': reqBody.championship })
      .sort('-fixture')
      .then((lastRound) => QueryUtils.makeObject(lastRound))
      .catch((err) => Boom.badData(err))
    )
  
  const _findChampionshipByLeague = (reqBody) => 
    Promise.resolve(Championship
    .findOne({ 'league': reqBody.league })
    .then((championships) => QueryUtils.makeObject(championships))
    .catch((err) => Boom.badData(err))
    )

  const _findFixtureChosen = (reqBody) => 
    Round
      .findOne({ 'championship': reqBody.championship, 'fixture': reqBody.fixture})
      .then((fixtureChosen) => QueryUtils.makeObject(fixtureChosen))

  return {
    championshipById,
    getLastRound,
    getChampionshipByLeague,
    getFixtureByNumber
  }
}