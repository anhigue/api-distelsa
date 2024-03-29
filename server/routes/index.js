const routes = require('express').Router();
module.exports = (app, str) => {

    const Response = require('../models/respuestas/response')

    // Importacion de controladores
    const EstadoController = require('../controllers/estados/estado.controller')(app, str, Response)
    const MonedaController = require('../controllers/monedas/moneda.controller')(app, str, Response)
    const TipoMaterialController = require('../controllers/materiales/tipo.material.controller')(app, str, Response)
    const TiendasController = require('../controllers/tiendas/tienda.controller')(app, str, Response)
    const TipoUsuarioController = require('../controllers/usuarios/tipo.usuario.controller')(app, str, Response)
    const ProveedoresController = require('../controllers/proveedores/proveedor.controller')(app, str, Response)
    const UsuariosController = require('../controllers/usuarios/usuario.controller')(app, str, Response)
    const MaterialesController = require('../controllers/materiales/material.controller')(app, str, Response)
    const MaterialesTiendaController = require('../controllers/materiales/material.tienda.controller')(app, str, Response)
    const AuthController = require('../controllers/auth/auth.controller')(app, str, Response)
    const ArrendamientosController = require('../controllers/arrendamientos/arrendamiento.controller')(app, str, Response)

    // Rutas de estados
    routes.post('/estado/', EstadoController.create)
    routes.delete('/estado/:id', EstadoController.delete)
    routes.get('/estado/', EstadoController.getAll)

    // Rutas de monedas
    routes.post('/moneda/', MonedaController.create)
    routes.delete('/moneda/:id', MonedaController.delete)
    routes.get('/moneda/', MonedaController.getAll)

    // Rutas de tipos de materiales
    routes.post('/tipo/material/', TipoMaterialController.create)
    routes.delete('/tipo/material/:id', TipoMaterialController.delete)
    routes.get('/tipo/material/', TipoMaterialController.getAll)

    // Rutas de tipos de materiales
    routes.post('/tienda/', TiendasController.create)
    routes.put('/tienda/', TiendasController.update)
    routes.delete('/tienda/:id', TiendasController.delete)
    routes.get('/tienda/', TiendasController.getAll)

    // Rutas de tipos de usuarios
    routes.post('/tipo/usuario/', TipoUsuarioController.create)
    routes.delete('/tipo/usuario/:id', TipoUsuarioController.delete)
    routes.get('/tipo/usuario/', TipoUsuarioController.getAll)

    // Rutas de proveedores
    routes.post('/proveedor/', ProveedoresController.create)
    routes.put('/proveedor/', ProveedoresController.update)
    routes.delete('/proveedor/:id', ProveedoresController.delete)
    routes.get('/proveedor/', ProveedoresController.getAll)

    // Rutas de usuarios
    routes.post('/usuario/', UsuariosController.create)
    routes.put('/usuario/', UsuariosController.update)
    routes.delete('/usuario/:id', UsuariosController.delete)
    routes.get('/usuario/', UsuariosController.getAll)
    routes.get('/usuario/:id', UsuariosController.getAll)

    // Rutas de materiales
    routes.post('/material/', MaterialesController.create)
    routes.put('/material/', MaterialesController.update)
    routes.delete('/material/:id', MaterialesController.delete)
    routes.get('/material/', MaterialesController.getAll)

    // Rutas de materiales por tiendas
    routes.post('/material/tienda/', MaterialesTiendaController.create)
    routes.put('/material/tienda/', MaterialesTiendaController.update)
    routes.delete('/material/tienda/:id', MaterialesTiendaController.delete)
    routes.get('/material/tienda/', MaterialesTiendaController.getAll)
    routes.get('/material/tienda/:id', MaterialesTiendaController.getAllByTienda)

    // Rutas de autentificacion
    routes.post('/login/', AuthController.validate, AuthController.login)

    // Rutas de arrendamientos
    routes.get('/arrendamiento/', ArrendamientosController.getAll)
    routes.get('/arrendamiento/:id', ArrendamientosController.getId)
    routes.get('/arrendamiento/tienda/:id', ArrendamientosController.getTienda)
    routes.get('/arrendamiento/usuario/:id', ArrendamientosController.getUsuario)
    routes.post('/arrendamiento/', ArrendamientosController.create)
    routes.put('/arrendamiento/', ArrendamientosController.updateState)

    return routes
}