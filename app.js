const express = require('express');
const morgan = require('morgan');

const moviesRouter = require('./Routes/moviesRoutes');

let app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use("/api/v1/movies", moviesRouter);

module.exports = app;

