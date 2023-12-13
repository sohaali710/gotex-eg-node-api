const express = require("express");
const routes = express.Router();
const { isAdminAuth } = require("../../middleware/admin");
const { checkCompany } = require("../../middleware/company");
const { createOrder, getUserOrders, edit } = require("../../controller/orders/orders");
const { isValid } = require("../../middleware/api-test");

routes.post("/create-user-order", isValid, checkCompany, createOrder);
routes.post("/get-user-orders", isValid, getUserOrders);

module.exports = routes;