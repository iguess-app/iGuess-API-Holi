'use Strict'

module.exports = (app) => {
  const championshipService = app.src.services.championship.getChampionshipByLeagueService
  const getChampionshipByIdService = app.src.services.championship.getChampionshipByIdService
  const getAllchampionshipService = app.src.services.championship.getAllchampionshipService

  const getChampionshipByLeague = (request, reply) => {
    championshipService.getChampionshipByLeague(request.query, request.headers)
      .then((championships) => reply(championships))
      .catch((err) => reply(err))
  }

  const getChampionshipById = (request, reply) => {
    getChampionshipByIdService.getChampionshipById(request.query, request.headers)
      .then((championship) => reply(championship))
      .catch((err) => reply(err))
  }

  const getAllchampionship = (request, reply) => {
    getAllchampionshipService.getAllchampionship(request.query, request.headers)
      .then((championship) => reply(championship))
      .catch((err) => reply(err))
  }

  return {
    getChampionshipByLeague,
    getChampionshipById,
    getAllchampionship
  }
}