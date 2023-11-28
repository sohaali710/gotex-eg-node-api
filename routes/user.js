const express = require("express");
const routes = express.Router();
const { signUp, marketerSignUp, logIn, activateUser, reSendActivateCode, forgetPasswordEmail, setNewPassword, getUserBalance, addBalance, checkPaymentOrder, getAllPaymentOrders, generateApiKeyForTest, generateApiKeyForProduction, getUserData } = require("../controller/user");
const { isValid, isAuth } = require('../middleware/user');
const { isValid: isValidApi } = require("../middleware/api-test");

routes.post('/signup', isValid, signUp);
routes.post('/login', logIn);

routes.get("/activate-user/:code/:id", activateUser);
routes.get("/resend-activate-code", isAuth, reSendActivateCode);

routes.post("/forget-password-email", forgetPasswordEmail);
routes.post("/set-new-password/:code", setNewPassword);

routes.get('/get-user-balance', isAuth, getUserBalance);
routes.post("/add-user-balance", isAuth, addBalance);
routes.get("/checkpayment/:status/:uId/:code", checkPaymentOrder);
routes.get("/get-all-payment-orders", isAuth, getAllPaymentOrders);

routes.get("/get-test-api-key", isAuth, generateApiKeyForTest);
routes.get("/get-production-api-key", isAuth, generateApiKeyForProduction);

routes.get('/get-user-data', isValidApi, getUserData);

module.exports = routes;