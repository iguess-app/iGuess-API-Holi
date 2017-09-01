'use Strict';

module.exports = (app) => {
  const getAllchampionshipRepository = app.src.repositories.championship.getAllchampionshipRepository;

  const getAllchampionship = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return getAllchampionshipRepository.getAllchampionship(payload, dictionary)
  }

  return {
    getAllchampionship
  }
};