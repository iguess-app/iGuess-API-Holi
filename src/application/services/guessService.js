'use Strict';

module.exports = (app) => {
  const guessRepository = app.src.application.repositories.guessRepository;

  const createLeague = (payload, headers) =>
    guessRepository.createLeague(payload, headers)
      .then((createdLeague) => 
        //TODO Add on profile.notifications the invite (createdLeague.players)
        createdLeague)
      .catch((err) => 
        //TODO verify if err.code===11000 and return 'guessLeagueName already in use'
        err)

  const inviteResponse = (payload, headers) =>
    guessRepository.inviteResponse(payload, headers)
      .then((response) => response)    //TODO Update the profile.guessLeague too
      .catch((err) => err)

  const quitGuessLeague = (payload, headers) => 
    guessRepository.quitGuessLeague(payload, headers)
      .then((response) => response)    //TODO Update the profile.guessLeague too
      .catch((err) => err)
  

  return {
    createLeague,
    inviteResponse,
    quitGuessLeague
  }
};