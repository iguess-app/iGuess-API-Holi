const Lab = require('lab')
const lab = exports.lab = Lab.script()
const expect = Lab.expect

const app = require('../../app')
const Championship = app.src.models.championshipModel

lab.experiment('Model Test ==> ChampionshipSchema Validator', () => {

  lab.test('ChampionshipSchema HappyPath', (done) => {
    const campBR = new Championship({
      'league': '5872467bed1b02314e08828a',
      'season': '2017',
      'championship': 'Campeonato Brasileiro',
      'championshipActive': true,
      'fixturesNames': [
        1,
        2,
        3,
        4
      ]
    })
    campBR.validate((err) => {
      expect(err).to.equal(null)
      done()
    })
  })

  lab.test('ChampionshipSchema Wrong League Id Ref Size', (done) => {
    const campBR = new Championship({
      'league': '5872467bed1b02314e088',
      'season': '2017',
      'championship': 'Copa do Brasil',
      'championshipActive': false,
      'fixturesNames': [
        '1st round',
        '2nd round',
        '3rd round',
        '4th round',
        '8th-finals',
        'Quarterfinals',
        'SemiFinals',
        'Final'
      ]
    })
    campBR.validate((err) => {
      expect(err.errors.league).to.exists()
      done()
    })
  })

  lab.test('ChampionshipSchema without Season', (done) => {
    const campBR = new Championship({
      'league': '5872467bed1b02314e0882',
      'championship': 'Campeonato Brasileiro',
      'fixturesNames': [
        1,
        2,
        3,
        4
      ]
    })
    campBR.validate((err) => {
      expect(err.errors.season).to.exists()
      expect(err.errors.season.message).to.be.equal('Path `season` is required.')
      expect(err.errors.championshipActive.message).to.be.equal('Path `championshipActive` is required.')
      done()
    })
  })

  lab.test('ChampionshipSchema without championship', (done) => {
    const campBR = new Championship({
      'league': '5872467bed1b02314e0882',
      'season': '2017',
      'championshipActive': true
    })
    campBR.validate((err) => {
      expect(err.errors.championship).to.exists()
      expect(err.errors.championship.message).to.be.equal('Path `championship` is required.')
      expect(err.errors.fixturesNames.message).to.be.equal('Path `fixturesNames` is required.')
      done()
    })
  })
})


/*eslint no-magic-numbers: 0*/