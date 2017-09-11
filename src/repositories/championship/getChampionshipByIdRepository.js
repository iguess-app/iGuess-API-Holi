'use strict'

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const Championship = app.src.models.championshipModel;

  const getChampionshipById = (payload) => {
    const searchQuery = {
      _id: payload.championshipId
    }

    return Championship.findOne(searchQuery)
      .then((championship) => QueryUtils.makeObject(championship))
  }

  return {
    getChampionshipById
  }
}