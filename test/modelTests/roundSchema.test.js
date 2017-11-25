'use strict'

const fs = require('fs')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const Round = require('../../src/models/roundModel')
const roundSchemas = JSON.parse(fs.readFileSync('test/modelTests/SchemaFiles/roundSchemasFile.json'))

const serverErrors = coincidents.Utils.errorUtils.serverErrors
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
      expect(err.errors.championshipRef.message).to.be.equal(String(serverErrors.notMongoIdValid))
      expect(err.errors['games.0._id'].message).to.be.equal('Cast to ObjectID failed for value "notObjectID" at path "_id"')
      expect(err.errors['games.0.initTime'].message).to.be.equal('Cast to Date failed for value "21/11/2011" at path "initTime"')
      expect(err.errors['games.0.stadium'].message).to.be.equal('Path `stadium` is required.')
      expect(err.errors.started.message).to.be.equal('Path `started` is required.')
      expect(err.errors.ended.message).to.be.equal('Path `ended` is required.')
      done()
    })
  }) 
})