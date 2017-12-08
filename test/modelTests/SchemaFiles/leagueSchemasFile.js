'use strict'


const correctSchema = {
  'country': 'Portugal',
  'countryInitials': 'pt',
  'name': 'Primeira Liga',
  'serie': 1.0,
  'association': 'UEFA',
  'continental': false,
  'flag': {
    'mini': 'https://storage.googleapis.com/iguess-static-files/nationals/mini/portugal.png',
    'small': 'https://storage.googleapis.com/iguess-static-files/nationals/small/portugal.png',
    'normal': 'https://storage.googleapis.com/iguess-static-files/nationals/normal/portugal.png'
  }
}

const withOutContryInitials = {
  'country': 'International Europe',
  'countryInitials': null,
  'name': 'UEFA Champions League',
  'serie': 1.0,
  'continental': true,
  'association': 'UEFA'
}

const serieNotNumber = {
  'country': 'Spain',
  'countryInitials': 'es',
  'name': 'La Liga BBVA',
  'serie': 'Primeira DIVISION',
  'continental': true,
  'association': 'UEFA',
  'flag': {
    'mini': 'https://storage.googleapis.com/iguess-static-files/nationals/mini/spain.png',
    'small': 'https://storage.googleapis.com/iguess-static-files/nationals/small/spain.png',
    'normal': 'https://storage.googleapis.com/iguess-static-files/nationals/normal/spain.png'
  }
}

module.exports = {
  correctSchema,
  withOutContryInitials,
  serieNotNumber
}