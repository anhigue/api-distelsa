const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const message = require('./utils/message')
const dataBase = require('../server/models/database/database')

const app = express();

app.set('estados', dataBase.Estados)
app.set('monedas', dataBase.Monedas)
app.set('tipo_materiales', dataBase.TipoMateriales)
app.set('tiendas', dataBase.Tiendas)
app.set('tipo_usuarios', dataBase.TipoUsuarios)
app.set('proveedores', dataBase.Proveedores)
app.set('usuarios', dataBase.Usuarios)
app.set('materiales', dataBase.Materiales)
app.set('materiales_tienda', dataBase.MaterialesTienda)
app.set('arrendamientos', dataBase.Arrendamientos)
app.set('arrendamientos_materiales', dataBase.ArrendamientosMateriales)

// app configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    next()
});

app.use(cors());
app.use('/api/', require('./routes')(app, message.MESSAGE_ESP))

app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;

