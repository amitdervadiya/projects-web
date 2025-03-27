const express = require('express');
const adminRoute = express.Router();
const adminMulter = require('../middleware/multer');
const adminController = require('../controller/adminController');
const authentication = require('../middleware/jwt');

adminRoute.post("/Register", adminMulter, adminController.adminRegister);
adminRoute.post("/Login", adminController.adminLogin);
adminRoute.get("/AdminList", authentication, adminController.adminList);
adminRoute.get("/AdminProfile", authentication, adminController.adminProfile);
adminRoute.post("/ChangePassword", authentication, adminController.adminChangePassword);
adminRoute.get("/ManagerList",authentication,adminController.managerList);
adminRoute.get("/EmployeeList",authentication,adminController.employeeList);
adminRoute.post("/forgotPassword", adminController.forgotPassword);
adminRoute.delete("/Delete", authentication, adminMulter, adminController.deleteAdmin);
adminRoute.put("/Update", authentication, adminMulter, adminController.updateAdmin);

module.exports = adminRoute;