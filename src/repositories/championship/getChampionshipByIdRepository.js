'use strict'

const Boom = require('boom');
const Promise = require('bluebird');

const Championship = require('../../models/championshipModel')
const QueryUtils = require('iguess-api-coincidents').Utils.queryUtils

const getChampionshipById = (payload) => {
  const searchQuery = {
    _id: payload.championshipId
  }

  return Championship.findOne(searchQuery)
    .then((championship) => QueryUtils.makeObject(championship))
}
module.exports = getChampionshipById