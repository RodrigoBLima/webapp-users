const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const upload = require("../middleware/upload");

let routes = (app) => {

  router.get("/users", userController.index);
  router.get("/users/:id", userController.userdata);
  router.post("/users", upload.single("photo"), userController.create);
  router.put("/users/:id", userController.update);
  router.delete("/users/:id", userController.delete);
 
  return app.use("/", router);
};

module.exports = routes;
