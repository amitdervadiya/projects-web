const express = require('express');
const employeeRoute = express.Router();
const employeeController = require('../controller/employeeController');
const authentication = require('../middleware/jwt');
const multer = require("../middleware/multer")

employeeRoute.post("/Register", multer, employeeController.employeeRegister);
employeeRoute.post("/Login", employeeController.employeeLogin);
employeeRoute.get("/List", authentication, employeeController.employeeList);
employeeRoute.get("/Profile", authentication, employeeController.employeeProfile);
employeeRoute.post("/ChangePassword", authentication, employeeController.employeeChangePassword);
employeeRoute.post("/ForgotPassword", employeeController.forgotPassword);
employeeRoute.post("/ResetPassword", employeeController.resetPassword);
employeeRoute.put("/Update", authentication, multer, employeeController.updateemployee);

module.exports = employeeRoute;