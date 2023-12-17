const express = require("express");
const routes = express.Router();
const { checkCompany } = require("../../middleware/company");
const { isValid } = require("../../middleware/api-test");
const { isAdminOrMarketer } = require("../../middleware/adminOrMarketer");
const { isMarketer } = require("../../middleware/marketer");
const { createOrder, getUserOrders, edit, getAllOrders, confirmOrder, getOrdersByMarketerCode } = require("../../controller/orders/orders");

routes.post("/create-user-order", isValid, checkCompany, createOrder);
routes.post("/get-user-orders", isValid, getUserOrders);

routes.post("/confirm-order", isMarketer, confirmOrder);
routes.get("/orders-by-marketer", isMarketer, getOrdersByMarketerCode)

routes.get("/", isAdminOrMarketer, getAllOrders);

module.exports = routes;