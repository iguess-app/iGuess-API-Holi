'use Strict';

module.exports = (app) => {

  const teamService = app.src.application.services.teamService;
  
  const getTeams = (request, reply) => {
    teamService.getTeams(request.payload)
      .then((teams) => {
        reply(teams)
      });
  }

  return { getTeams }
}