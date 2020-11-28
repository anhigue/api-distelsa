const routes = require('express').Router();
module.exports = (app, str) => {

    const Response = require('../models/respuestas/response')

    // Importacion de controladores
    const EstadoController = require('../controllers/estados/estado.controller')(app, str, Response)

    // Rutas de estados
    routes.post('/estado/', EstadoController.create)
    routes.delete('/estado/:id', EstadoController.delete)
    routes.get('/estado/', EstadoController.getAll)

    return routes
}