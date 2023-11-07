module.exports = (routes) => {
  let router = require("express").Router();
  let controller = require("../controllers/controller.js");

  // router.get("route",callback)
  router.get("/home", controller.home);

  router.get("/about", controller.about);

  router.post("/register", controller.register);

  router.get("/alldata", controller.data);

  router.post("/onedata", controller.onedata);

  router.post("/update", controller.updateData);

  router.post("/delete", controller.delete);

  routes.use("/", router);
};
