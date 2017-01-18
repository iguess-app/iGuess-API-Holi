'use Strict';

module.exports = (app) => {

  const teamService = app.src.application.services.teamService;
  
  const getTeams = (request, reply) => {
    teamService.getTeams(request.headers)
      .then((teams) => {
        reply(teams)
      });
  }

  return { getTeams }
}