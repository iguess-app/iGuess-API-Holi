'use Strict';

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const Round = app.src.schemas.roundShema;

  const getLastRound = (reqBody) => _findLastRound(reqBody)

  const _findLastRound = (reqBody) => 
    Promise.resolve(Round
      .findOne({ 'championship': reqBody.championship })
      .sort('-round')
      .then((lastRound) => lastRound)
      .catch((err) => Boom.badData(err))
    )
  
  return { getLastRound }
}