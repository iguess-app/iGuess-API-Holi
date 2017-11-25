'use strict'

const correctSchema = {
  'championshipRef': '5872a8d2ed1b02314e088291',
  'ended': false,
  'started': false,
  'games': [{
      '_id': '5872467bed1b02314e08828b',
      'homeTeam': {
        'teamRef': '5872a51a4db3fb378bc7ee15',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Clube Atlético Mineiro',
        'shortName': 'Atlético-MG',
        'logo': 'nothing =('
      },
      'awayTeam': {
        'teamRef': '5872a1d1ed1b02314e08828f',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Clube Atlético Paranaense',
        'shortName': 'Atlético-PR',
        'logo': 'nothing =('
      },
      'initTime': '2017-06-06T02:22:51.000Z',
      'stadium': 'INDEPENDÊNCIA'
    },
    {
      '_id': '5872467bed1b02314e08828b',
      'homeTeam': {
        'teamRef': '5872a51a4db3fb378bc7ee21',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Sport Club do Recife',
        'shortName': 'Sport',
        'logo': 'nothing =('
      },
      'awayTeam': {
        'teamRef': '587241f6ed1b02314e088288',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'São Paulo Futebol Clube',
        'shortName': 'São Paulo',
        'logo': 'nothing =('
      },
      'initTime': '2017-06-06T02:22:51.000Z',
      'stadium': 'ILHA DO RETIRO'
    }
  ]
}

const someErrorsSchema = {
  'championshipRef': 'notObjectID',
  'games': [{
      '_id': 'notObjectID',
      'homeTeam': {
        'teamRef': '5872a51a4db3fb378bc7ee15',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Clube Atlético Mineiro',
        'shortName': 'Atlético-MG',
        'logo': 'nothing =('
      },
      'awayTeam': {
        'teamRef': '5872a1d1ed1b02314e08828f',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Clube Atlético Paranaense',
        'shortName': 'Atlético-PR',
        'logo': 'nothing =('
      },
      'initTime': '21/11/2011',
      'stadium': null
    },
    {
      '_id': '5872467bed1b02314e08828b',
      'homeTeam': {
        'teamRef': '5872a51a4db3fb378bc7ee21',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Sport Club do Recife',
        'shortName': 'Sport',
        'logo': 'nothing =('
      },
      'awayTeam': {
        'teamRef': '587241f6ed1b02314e088288',
        'league': '5872467bed1b02314e08828a',
        'fullName': 'São Paulo Futebol Clube',
        'shortName': 'São Paulo',
        'logo': 'nothing =('
      },
      'initTime': '2017-06-06T02:22:51.000Z',
      'stadium': 'ILHA DO RETIRO'
    }
  ]
}

module.exports = {
  correctSchema,
  someErrorsSchema
}