'use strict'

const correctSchema = {
  'championshipRef': '5872a8d2ed1b02314e088291',
  'date': '2017-06-15T03:00:00.000Z',
  'unixDate': 1497495600,
  'games': [{
      'initTime': '2017-06-15T19:00:00.000Z',
      'homeTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Coritiba Foot Ball Club',
        'shortName': 'Coritiba',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Coritiba',
        'teamRef': '5872a51a4db3fb378bc7ee1b'
      },
      'awayTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Esporte Clube Bahia',
        'shortName': 'Bahia',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Bahia',
        'teamRef': '5872a51a4db3fb378bc7ee17'
      },
      'homeTeamScore': 0,
      'awayTeamScore': 0,
      '_id': '59d1475c70dc031ae0973e39',
      'ended': true
    },
    {
      'initTime': '2017-06-16T00:00:00.000Z',
      'homeTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Fluminense Football Club',
        'shortName': 'Fluminense',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Fluminense',
        'teamRef': '5872a51a4db3fb378bc7ee1e'
      },
      'awayTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Grêmio Foot-Ball Porto Alegrense',
        'shortName': 'Grêmio',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Gremio',
        'teamRef': '5872a51a4db3fb378bc7ee1f'
      },
      'homeTeamScore': 0,
      'awayTeamScore': 2,
      '_id': '59d1475c70dc031ae0973e38',
      'ended': false
    }
  ]
}

const someErrorsSchema = {
  'championshipRef': '5872a8d2ed1b02314e088291',
  'date': 'NOT A VALID DATE',
  'unixDate': 'NOT A NUMBER',
  'games': [{
      'initTime': 'NOT A VALID DATE',
      'homeTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Coritiba Foot Ball Club',
        'shortName': 'Coritiba',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Coritiba',
        'teamRef': '5872a51a4db3fb378bc7ee1b'
      },
      'awayTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Esporte Clube Bahia',
        'shortName': 'Bahia',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Bahia',
        'teamRef': '5872a51a4db3fb378bc7ee17'
      },
      'homeTeamScore': 0,
      'awayTeamScore': 0,
      '_id': '59d1475c70dc031ae0973e39',
      'ended': true
    },
    {
      'initTime': '2017-06-16T00:00:00.000Z',
      'homeTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Fluminense Football Club',
        'shortName': 'Fluminense',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Fluminense',
        'teamRef': '5872a51a4db3fb378bc7ee1e'
      },
      'awayTeam': {
        'league': '5872467bed1b02314e08828a',
        'fullName': 'Grêmio Foot-Ball Porto Alegrense',
        'shortName': 'Grêmio',
        'logo': {
          'mini': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'small': 'https://storage.googleapis.com/iguess-static-files/conmebol......',
          'normal': 'https://storage.googleapis.com/iguess-static-files/conmebol......'
        },
        'apiFootballName': 'Gremio',
        'teamRef': '5872a51a4db3fb378bc7ee1f'
      },
      'homeTeamScore': 0,
      'awayTeamScore': 2,
      '_id': '59d1475c70dc031ae0973e38',
      'ended': true
    }
  ]
}

module.exports = {
  correctSchema,
  someErrorsSchema
}