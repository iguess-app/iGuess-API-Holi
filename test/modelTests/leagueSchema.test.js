const fs = require('fs')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const League = require('../../src/models/leagueModel')

const leagueSchemas = require('./SchemaFiles/leagueSchemasFile')

lab.experiment('Model Test ==> LeagueSchema Validator', () => {

  lab.test('LeagueSchema HappyPath', (done) => {
    const correctSchema = new League(leagueSchemas.correctSchema)
    correctSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })
  lab.test('LeagueSchema withOutContryInitials', (done) => {
    const withOutContryInitialsSchema = new League(leagueSchemas.withOutContryInitials)
    withOutContryInitialsSchema.validate((err) => {
      expect(err.errors.countryInitials.message).to.be.equal('Path `countryInitials` is required.')
      done()
    })
  })
  lab.test('LeagueSchema serieNotNumber', (done) => {
    const serieNotNumberSchema = new League(leagueSchemas.serieNotNumber)
    serieNotNumberSchema.validate((err) => {
      expect(err.errors.serie.message).to.be.equal('Cast to Number failed for value "Primeira DIVISION" at path "serie"')
      done()
    })
  })
})