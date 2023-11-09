const express = require("express");
const router = express.Router();
const { managerController } = require("../controllers");

router.get("/employeeList", managerController.getEmployee);
router.get("/managerList", managerController.getManagers);
router.post("/updateEmp", managerController.login);
router.put("/updateEmployee/:id", managerController.updateEmployeeDepartment);
router.put("/updateManager/:id", managerController.updateManager);
router.get("/getOneEmployee/:id", managerController.getOneEmployee);

module.exports = router;
