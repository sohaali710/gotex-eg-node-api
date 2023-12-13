const express = require("express");
const routes = express.Router();
const { isAdminAuth } = require("../middleware/admin");
const { getCompany, edit } = require("../controller/comapny");

routes.get("/", getCompany);
routes.post("/edit", isAdminAuth, edit);

module.exports = routes;