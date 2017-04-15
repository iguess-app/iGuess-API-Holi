const consign = require('consign');
const app = {};

consign()
  .include('configServer.js')
  .include('src/config.js')
  .include('src/utils')
  .include('src/managers')
  .include('src/schemas')
  .include('src/cron')
  .include('src/application/repositories')
  .include('src/application/services')
  .include('src/application/controllers')
  .include('src/application/routes')
  .include('test/unitTests')
  .include('test/integratedTests')
  .into(app);

app.configServer.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at ${app.configServer.info.uri}`);
})