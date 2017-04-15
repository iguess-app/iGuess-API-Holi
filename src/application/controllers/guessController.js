'use Strict';

module.exports = (app) => {

  const guessService = app.src.application.services.guessService;

  const laucher = (request, reply) => {
    
    //Just calling yoo() temporally 
    const guessesInterpreter = app.src.cron.guessesInterpreter.yoo();

  }

  return {
    laucher
  }
}