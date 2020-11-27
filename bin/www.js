
const app = require('../server/server')
const config = require('../server/config/config')
const utiles = require('../server/utils/utils')

require('../server/models/database/database')

const port = utiles.normalizePort(config.port)

app.listen(port, () => {
  console.log("Servidor iniciado en el puerto: " + port);
  console.log("Debug del server: ");
});


