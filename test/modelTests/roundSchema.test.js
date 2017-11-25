'use strict'

const Lab = require('lab')

const Round = require('../../src/models/roundModel')
const roundSchemas = require('./SchemaFiles/roundSchemasFile')

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Model Test ==> RoundSchema Validator', () => {

  lab.test('RoundSchema HappyPath', (done) => {
    const correctSchema = new Round(roundSchemas.correctSchema)
    correctSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('RoundSchema many errors checker', (done) => {
    const someErrorsSchema = new Round(roundSchemas.someErrorsSchema)
    someErrorsSchema.validate((err) => {
      expect(err.errors['games.0.initTime'].message).to.be.equal('Cast to Date failed for value "NOT A VALID DATE" at path "initTime"')
      expect(err.errors.unixDate.message).to.be.equal('Cast to Number failed for value "NOT A NUMBER" at path "unixDate"')
      expect(err.errors.date.message).to.be.equal('Cast to Date failed for value "NOT A VALID DATE" at path "date"')
      done()
    })
  })
})