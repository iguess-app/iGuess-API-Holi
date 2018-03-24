'use strict'

const Lab = require('lab')

const Match = require('../../src/models/matchModel')
const matchSchemas = require('./SchemaFiles/matchSchemasFile')

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Model Test ==> RoundSchema Validator', () => {

  lab.test('RoundSchema HappyPath', (done) => {
    const correctSchema = new Match(matchSchemas.correctSchema)
    correctSchema.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

})