'use Strict';

const Promise = require('bluebird');

const INVITED = 'invited';
const PLAYING = 'playing';
const DECLINED = 'declined';
const QUITTED = 'quitted';

module.exports = (app) => {
  const QueryUtils = app.coincidents.Utils.queryUtils;
  const GuessLeague = app.coincidents.Schemas.guessesLeaguesSchema;

  const createLeague = (request) => {
    //TODO Check if the championshipID exists
    //TODO Check if all over the users exists

    const invitedPlayers = request.invited.map((invited) => ({
      userID: invited,
      status: INVITED
    }))

    const GuessLeagueObj = {
      _id: request.guessLeagueName,
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

  const inviteResponse = (request) => {

    const newStatus = request.invitedAccepted ? PLAYING : DECLINED;
    const searchQuery = {
      '_id': request.guessLeagueName,
      'players.userID': request.userID
    }
    const updateQuery = {
      '$set': {
        'players.$.status': newStatus
      }
    }

    return GuessLeague
      .update(searchQuery, updateQuery)
      .then((queryResult) => {
        if (queryResult.nModified) {
          return true;
        }

        return false;
      })
  }

  const quitGuessLeague = (request) => {
    const searchQuery = {
      '_id': request.guessLeagueName,
      'players.userID': request.userID
    }
    const updateQuery = {
      '$set': {
        'players.$.status': QUITTED
      }
    }
    //TODO if is the admnistrator, dont let quit

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
    inviteResponse,
    quitGuessLeague
  }
}