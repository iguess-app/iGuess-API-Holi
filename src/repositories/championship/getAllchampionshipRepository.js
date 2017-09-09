'use Strict';

module.exports = (app) => {
  const Championship = app.src.models.championshipSchema

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