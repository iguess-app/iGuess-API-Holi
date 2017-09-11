'use strict'

module.exports = (app) => {
  const getAllChampionshipRepository = app.src.repositories.championship.getAllChampionshipRepository;

  const getAllchampionship = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getAllChampionshipRepository.getAllchampionship(payload, dictionary)
  }

  return {
    getAllchampionship
  }
};