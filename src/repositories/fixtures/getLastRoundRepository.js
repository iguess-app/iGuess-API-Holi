'use strict'

const Boom = require('boom')

module.exports = (app) => {
  const Round = app.src.models.roundModel
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getLastRound = (reqBody) => _findLastRound(reqBody)

  const _findLastRound = (reqBody) => Round.findOne({
      'championshipRef': reqBody.championshipRef
    })
    .sort('-fixture')
    .then((lastRound) => QueryUtils.makeObject(lastRound))
    .catch((err) => Boom.badData(err))

  return {
    getLastRound
  }
}