const express = require("express");
const routes = express.Router();
const { logIn, getAllUsers, addWalletToUser, proofCrForUser, unProofCrForUser } = require("../controller/admin");
const { isAdminAuth } = require("../middleware/admin");

routes.post('/login', logIn);

routes.get('/get-all-users', isAdminAuth, getAllUsers);
routes.post('/add-deposit-to-user', isAdminAuth, addWalletToUser);
routes.post("/proof-user-cr", isAdminAuth, proofCrForUser);
routes.post("/un-proof-user-cr", isAdminAuth, unProofCrForUser);

// routes.get("/companies/get-all", isAdminAuth, getAllCompanies);
// routes.get("/orders/get-all", isAdminAuth, getAllOrders);

module.exports = routes;