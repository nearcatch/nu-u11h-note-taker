const api = require('express').Router();

const notesRouter = require('./notes');

api.use('/notes', notesRouter);

module.exports = api;
