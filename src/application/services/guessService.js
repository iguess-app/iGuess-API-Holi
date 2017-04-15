'use Strict';

module.exports = (app) => {
  const guessRepository = app.src.application.repositories.guessRepository;

  const createLeague = (payload, headers) =>
    guessRepository.createLeague(payload, headers)
    .then((createdLeague) => 
      //TODO Add on profile.notifications the invite (createdLeague.players)
       createdLeague)
    .catch((err) => 
      //TODO verify if err.code===11000 and return 'leagueName already in use'
       err)

  const responseInvite = (payload, headers) =>
    guessRepository.responseInvite(payload, headers)
    .then((response) => response)
    .catch((err) => err)


  return {
    createLeague,
    responseInvite
  }
};