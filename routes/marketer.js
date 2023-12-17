const express = require("express");
const routes = express.Router();
const { isAdminAuth } = require("../middleware/admin");
const { logIn, getAllMarketers, createMarketerAccount } = require("../controller/marketer");

routes.post("/create-marketer-account", isAdminAuth, createMarketerAccount);
routes.get("/get-all-marketer", isAdminAuth, getAllMarketers);

routes.post("/login", logIn);

module.exports = routes