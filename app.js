require('express-async-errors');
const express = require('express');
const cors = require('cors');
const error = require('./Middlewares/error');
const app = express();

app.use(express.json());
app.use(cors())

app.use(error);
module.exports = app;