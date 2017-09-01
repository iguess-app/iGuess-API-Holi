'use Strict';

module.exports = (app) => {
  const getChampionshipRepository = app.src.repositories.championship.getChampionshipRepository;

  const getChampionshipById = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getChampionshipRepository.getChampionshipById(payload, dictionary)
  }

  return {
    getChampionshipById
  }
};