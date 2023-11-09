const express = require("express");

const authRoute = require("./auth.route");
const managerRoute = require("./manager.route");
const employeeRoute = require("./employee.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/manager",
    route: managerRoute,
  },
  {
    path: "/employee",
    route: employeeRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
