'use strict'

module.exports = (app) => {
  const Championship = app.src.models.championshipModel

  const getAllchampionship = (payload) => {
    const searchQuery = {}
    if (payload.onlyActive) {
      searchQuery.championshipActive = true
    }

    return Championship.find(searchQuery)
  }

  return {
    getAllchampionship
  }
}