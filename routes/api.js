const api = require('express').Router();

const notesRouter = require('./notes');

// use notesRouter for /notes
api.use('/notes', notesRouter);

module.exports = api;
