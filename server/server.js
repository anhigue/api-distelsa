const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const message = require('./utils/message')

var app = express();

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
app.use((req, res, next) => {
    next(createError(404));
});
app.use('/api/', require('./routes')(app, message.MESSAGE_ESP))



module.exports = app;

