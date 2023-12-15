const express = require("express");
const routes = express.Router();
const { MarketerSignUp, logIn, getAllMarketers, getOrdersByMarketerCode } = require("../controller/marketer");
const { isAdminAuth } = require("../middleware/admin");
const { isValid, isMarketer } = require("../middleware/marketer");
routes.post("/signup", isValid, MarketerSignUp);
routes.post("/login", logIn);
routes.get("/get-all-marketer", isAdminAuth, getAllMarketers);
routes.get("/all-orders-by-marketer", isMarketer, getOrdersByMarketerCode)

module.exports = routes