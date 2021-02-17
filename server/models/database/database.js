const app = require('../../server')
const config = require('../../config/config')
const sequelize = require('sequelize')

// Modelos de base de datos
const EstadosModel = require('../estados/estado.model')
const MonedasModel = require('../monedas/monedas.mode')
const TipoMaterialesModel = require('../materiales/tipo.material.model')
const TiendasModel = require('../tiendas/tienda.model')
const TipoUsuariosModel = require('../usuarios/tipo.usuario.model')
const ProveedoresModel = require('../proveedores/proveedor.model')
const UsuariosModel = require('../usuarios/usuario.model')
const MaterialesModel = require('../materiales/material.model')
const MaterialesTiendaModel = require('../materiales/material.tienda.model')
const ArrendamientosModel = require('../arrendamientos/arrendamiento.model')
const ArrendamientosMaterialesModel = require('../arrendamientos/arrendamiento.material.model')

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
const Proveedores = ProveedoresModel(Sequelize, sequelize)
const Usuarios = UsuariosModel(Sequelize, sequelize, TipoUsuarios)
const Materiales = MaterialesModel(Sequelize, sequelize, TipoMateriales)
const MaterialesTienda = MaterialesTiendaModel(Sequelize, sequelize, Materiales, Tiendas, Monedas)
const Arrendamientos = ArrendamientosModel(Sequelize, sequelize, Estados, Usuarios, Proveedores, Monedas, Tiendas)
const ArrendamientosMateriales = ArrendamientosMaterialesModel(Sequelize, sequelize, Arrendamientos, MaterialesTienda)

module.exports = {
    Estados,
    Monedas,
    TipoMateriales,
    Tiendas,
    TipoUsuarios,
    Proveedores,
    Usuarios,
    Materiales,
    MaterialesTienda,
    Arrendamientos,
    ArrendamientosMateriales
}