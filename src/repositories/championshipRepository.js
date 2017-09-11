'use strict'

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const Round = app.src.models.roundModel;
  const Championship = app.src.models.championshipModel;

  const getChampionshipByLeague = (reqBody) => _findChampionshipByLeague(reqBody)

  const getFixtureByNumber = (reqBody) => _findFixtureChosen(reqBody)
  
  const _findChampionshipByLeague = (reqBody) => 
    Promise.resolve(Championship
    .find({ 'league': reqBody.league })
    .catch((err) => Boom.badData(err))
    )

  const _findFixtureChosen = (reqBody) => 
    Round
      .findOne({ 'championship': reqBody.championship, 'fixture': reqBody.fixture})
      .then((fixtureChosen) => QueryUtils.makeObject(fixtureChosen))

  return {
    getChampionshipByLeague,
    getFixtureByNumber
  }
}