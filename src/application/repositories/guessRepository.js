'use Strict';

const Boom = require('boom');
const Promise = require('bluebird');

module.exports = (app) => {

  const QueryUtils = app.src.utils.queryUtils;
  const GuessLeague = app.src.schemas.guessesLeaguesSchema;

  const createLeague = (request) => {
    //TODO Check if the championshipID exists
    //TODO Check if all over the users exists
    const INVITED = 'invited';
    const invitedPlayers = request.invited.map((invited) => ({
      userID: invited,
      status: INVITED
    }))

    const GuessLeagueObj = {
      _id: request.leagueName,
      administrator: request.userID,
      players: invitedPlayers
    }

    return Promise.resolve(GuessLeague
      .create(GuessLeagueObj)
      .then((DBResponse) => 
        DBResponse
      )
      .catch((err) =>
        QueryUtils.makeJSON(err)
      )
    )
  }

  return {
    createLeague
  }
}