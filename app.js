'use strict'

require('./src/routes/')
const plugins = require('./src/plugins/serverPlugins')
const server = require('./configServer')

server.register(plugins, () => {
  server.start((err) => {
    if (err) {
      throw err;
    }
  })
})

module.exports = server

//require('./src/services/fixtures/updateMatchDayResultService')({}, {language: 'en-us'})