const express = require("express");
const router = express.Router();
const { managerController } = require("../controllers");

router.get("/employeeList", managerController.getEmployee);
router.get("/managerList", managerController.getManagers);
router.post("/updateEmp", managerController.login);
router.post("/updateEmployee/:id", managerController.updateEmployeeDepartment);
router.get("/getOneEmployee/:id", managerController.getOneEmployee);

module.exports = router;
