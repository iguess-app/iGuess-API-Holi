'use strict'

module.exports = (app) => {
  const getChampionshipByIdRepository = app.src.repositories.championship.getChampionshipByIdRepository;

  const getChampionshipById = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getChampionshipByIdRepository.getChampionshipById(payload, dictionary)
  }

  return {
    getChampionshipById
  }
};