'use strict'

const md5 = require('md5')
const moment = require('moment')

const buildMatchRef = (match, leagueObj) => {
  const longString = leagueObj.currentChampionshipRef + match.homeTeam.teamRef.toString() + match.awayTeam.teamRef.toString() + moment(match.initTime).format('YYYY-MM-DD')
  
  return md5(longString)
}

module.exports = {
  buildMatchRef
}