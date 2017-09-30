'use strict'

const getAllchampionshipService = require('../services/championship/getAllchampionshipService')
const getChampionshipByIdService = require('../services/championship/getChampionshipByIdService')
const getChampionshipByLeagueService = require('../services/championship/getChampionshipByLeagueService')

const getChampionshipByLeague = (request, reply) => {
  getChampionshipByLeagueService(request.query, request.headers)
    .then((championships) => reply(championships))
    .catch((err) => reply(err))
}

const getChampionshipById = (request, reply) => {
  getChampionshipByIdService(request.query, request.headers)
    .then((championship) => reply(championship))
    .catch((err) => reply(err))
}

const getAllchampionship = (request, reply) => {
  getAllchampionshipService(request.query, request.headers)
    .then((championship) => reply(championship))
    .catch((err) => reply(err))
}

module.exports = {
  getChampionshipByLeague,
  getChampionshipById,
  getAllchampionship
}