const express = require("express");
const routes = express.Router();
const { isAdminAuth } = require("../../middleware/admin");
const { checkCompany } = require("../../middleware/company");
const { createOrder, getUserOrders, edit, getAllOrders } = require("../../controller/orders/orders");
const { isValid } = require("../../middleware/api-test");
const { isAdminOrMarketer } = require("../../middleware/adminOrMarketer");

routes.post("/create-user-order", isValid, checkCompany, createOrder);
routes.post("/get-user-orders", isValid, getUserOrders);

routes.get("/", isAdminOrMarketer, getAllOrders);

module.exports = routes;