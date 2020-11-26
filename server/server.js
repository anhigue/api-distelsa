const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const app = express();

// app configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;

