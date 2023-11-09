module.exports = (routes) => {
  let router = require("express").Router();
  let controller = require("../controllers/controller.js");



  routes.use("/", router);
};
