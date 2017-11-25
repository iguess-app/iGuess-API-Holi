'use strict'

const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const Team = require('../../src/models/teamModel')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const serverErrors = coincidents.Utils.errorUtils.serverErrors

lab.experiment('Model Test ==> TeamSchema Validator', () => {

  lab.test('TeamSchema HappyPath', (done) => {
    const avai = new Team({
      'league': '5872467bed1b02314e08828a',
      'fullName': 'Avaí Futebol Clube',
      'shortName': 'Avai',
      'logo': 'Link'
    })
    avai.validate((err) => {
      expect(err).to.equal(null);
      done();
    })
  });

  lab.test('TeamSchema withOut fullName', (done) => {
    const avai = new Team({
      'league': '5872467bed1b02314e08828a',
      'shortName': 'Avai',
      'logo': 'Link'
    })
    avai.validate((err) => {
      expect(err.errors.fullName).to.exists();
      expect(err.errors.fullName.message).to.be.equal('Path `fullName` is required.')
      done();
    })
  });

  lab.test('TeamSchema with league Ref equal to null', (done) => {
    const avai = new Team({
      'league': null,
      'fullName': 'Avaí Futebol Clube',
      'logo': 'Link'
    })
    avai.validate((err) => {
      expect(err.errors.league).to.exists();
      expect(err.errors.league.message).to.be.equal('Path `league` is required.')
      expect(err.errors.shortName.message).to.be.equal('Path `shortName` is required.')
      done();
    })
  });

  lab.test('TeamSchema with league Ref on wrong size', (done) => {
    const avai = new Team({
      'league': 'notObjectID',
      'fullName': 'Avaí Futebol Clube',
      'shortName': 'Avai',
      'logo': 'Link'
    })
    avai.validate((err) => {
      expect(err.errors.league).to.exists();
      expect(err.errors.league.message).to.be.equal(String(serverErrors.notMongoIdValid))
      done();
    })
  });
});