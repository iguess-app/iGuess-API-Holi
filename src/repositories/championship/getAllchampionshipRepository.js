'use Strict';

module.exports = (app) => {
  const Championship = app.coincidents.Schemas.championshipSchema

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