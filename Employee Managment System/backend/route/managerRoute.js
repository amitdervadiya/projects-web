const express = require('express');
const managerRoute = express.Router();
const managerController = require('../controller/managerController');
const authentication = require('../middleware/jwt');
const multer = require("../middleware/multer")


managerRoute.post("/Register", multer, managerController.managerRegister);
managerRoute.post("/Login", managerController.managerLogin);
managerRoute.get("/Profile", authentication, managerController.managerProfile);
managerRoute.post("/ChangePassword", authentication, managerController.managerChangePassword);
managerRoute.post("/forgotPassword", managerController.forgotPassword);
managerRoute.get("/EmployeeList", authentication, managerController.employeeList);
managerRoute.delete("/Delete", authentication, managerController.deleteManager);
managerRoute.put("/Update", authentication, multer, managerController.updateManager);
module.exports = managerRoute;