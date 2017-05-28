'use Strict';

const Promise = require('bluebird');

module.exports = (app) => {
  const getChampionshipRepository = app.src.repositories.championship.getChampionshipRepository;

  const getChampionship = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getChampionshipRepository.getChampionship(payload, dictionary)
  }

  return {
    getChampionship
  }
};