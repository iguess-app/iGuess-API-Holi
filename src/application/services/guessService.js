'use Strict';

module.exports = (app) => {
  const guessRepository = app.src.application.repositories.guessRepository;

  const createLeague = (payload, headers) =>
    guessRepository.createLeague(payload, headers)
    .then((createdLeague) => createdLeague)
    .catch((err) => {
      //TODO verify if err.code===11000 and return 'leagueName already in use'
       return err;
    })

  return {
    createLeague
  }
};