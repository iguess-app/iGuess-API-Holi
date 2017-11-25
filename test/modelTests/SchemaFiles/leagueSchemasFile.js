'use strict'


const correctSchema = {
  'country': 'Brazil',
  'countryInitials': 'br',
  'name': 'Primeira Divisão',
  'serie': 1.0
}
const withOutContryInitials = {
  'country': 'International Europe',
  'countryInitials': null,
  'name': 'UEFA Champions League',
  'serie': 1.0
}
const serieNotNumber = {
  'country': 'Spain',
  'countryInitials': 'es',
  'name': 'La Liga BBVA',
  'serie': 'Primeira DIVISION'
}

module.exports = {
  correctSchema,
  withOutContryInitials,
  serieNotNumber
}