'use strict'

const teamService = require('../services/teamService')

const getTeams = (request, reply) => {
  teamService(request.query, request.headers)
    .then((teams) => reply(teams))
    .catch((err) => reply(err))
}

module.exports = {
  getTeams
}