'use Strict';

module.exports = (app) => {
  const teamService = app.src.services.teamService;
  
  const getTeams = (request, reply) => {
    teamService.getTeams(request.query)
      .then((teams) => {
        reply(teams)
      });
  }

  return { getTeams }
}