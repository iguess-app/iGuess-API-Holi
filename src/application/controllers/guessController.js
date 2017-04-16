'use Strict';

module.exports = (app) => {

  const guessService = app.src.application.services.guessService;

  const laucher = (request, reply) => {
    //Just calling yoo() temporally 
    //const guessesInterpreter = app.src.cron.guessesInterpreter.yoo();
  }

  const createLeague = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    guessService.createLeague(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const inviteResponse = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    guessService.inviteResponse(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  const quitGuessLeague = (request, reply) => {
    const payload = request.payload;
    const headers = request.headers;

    guessService.quitGuessLeague(payload, headers)
      .then((response) => reply(response))
      .catch((err) => reply(err))
  }

  return {
    laucher,
    createLeague,
    inviteResponse,
    quitGuessLeague
  }
}