'use strict'

const Championship = require('../../models/championshipModel')

const getAllchampionship = (payload) => {
  const searchQuery = {}
  if (payload.onlyActive) {
    searchQuery.championshipActive = true
  }

  return Championship.find(searchQuery)
}
module.exports = getAllchampionship