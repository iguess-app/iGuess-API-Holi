'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {

  const QueryUtils = app.src.utils.queryUtils;
  const GuessLeague = app.src.schemas.guessesLeaguesSchema;
  const INVITED = 'invited';
  const PLAYING = 'playing';
  const DECLINED = 'declined';
  const QUITTED = 'quitted';

  const createLeague = (request) => {
    //TODO Check if the championshipID exists
    //TODO Check if all over the users exists

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
        QueryUtils.makeObject(DBResponse)
      )
      .catch((err) =>
        QueryUtils.makeJSON(err)
      )
    )
  }

  const responseInvite = (request) => {

    const newStatus = request.invitedAccepted ? PLAYING : DECLINED;
    const searchQuery = {
      '_id': request.leagueName,
      'players.userID': request.userID
    }
    const updateQuery = {
      '$set': {
        'players.$.status': newStatus
      }
    }
    //TODO response of this route is 500, discover why

    return GuessLeague
      .update(searchQuery, updateQuery)
      .then((queryResult) => {
        if (queryResult.nModified) {
          return true;
        }

        return false;
      })

  }

  return {
    createLeague,
    responseInvite
  }
}