const app = require('../../server')
const config = require('../../config/config')
const sequelize = require('sequelize')

// Modelos de base de datos
const EstadosModel = require('../estados/estado.model')
const MonedasModel = require('../monedas/monedas.mode')
const TipoMaterialesModel = require('../materiales/tipo.material.model')
const TiendasModel = require('../tiendas/tienda.model')
const TipoUsuariosModel = require('../usuarios/tipo.usuario.model')

const Sequelize = new sequelize(config.db, config.user, config.password, config.dbOptions);

Sequelize.sync({
    force: false
}).then((sync) => {
    console.log('Base de datos sincronizada');
}).catch((err) => {
    console.log('Error al sincronizar la base de datos', err);
});

// Instancia de modelos
const Estados = EstadosModel(Sequelize, sequelize)
const Monedas = MonedasModel(Sequelize, sequelize)
const TipoMateriales = TipoMaterialesModel(Sequelize, sequelize)
const Tiendas = TiendasModel(Sequelize, sequelize)
const TipoUsuarios = TipoUsuariosModel(Sequelize, sequelize)

// Instancia en aplicacion
app.set('estados', Estados)
app.set('monedas', Monedas)
app.set('tipo_materiales', TipoMateriales)
app.set('tiendas', Tiendas)
app.set('tipo_usuarios', TipoUsuarios)

module.exports = app