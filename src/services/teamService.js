'use strict'

const teamRepository = require('../repositories/teamRepository')

const getTeams = (payload) => teamRepository.getTeams(payload)

module.exports = getTeams