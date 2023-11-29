const express = require("express");
const routes = express.Router();
const { getEgCities } = require("../controller/cities");

routes.get('/', getEgCities);

module.exports = routes;