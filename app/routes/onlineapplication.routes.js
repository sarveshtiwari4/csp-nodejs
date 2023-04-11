module.exports = app => {
  const isValid = require("./verifyToken");
  
  console.log("200");
  const onlineApplication = require("../controllers/onlineapplication.controller.js");

  
  var router = require("express").Router();

  // Create a newmaster
  router.post("/", isValid,onlineApplication.create);

  // Retrieve all Tutorials
  router.get("/",onlineApplication.findAll);

  // Retrieve all published Tutorials
  router.get("/published",onlineApplication.findAllPublished);

  // Retrieve a singlemaster with id
  router.get("/:id",onlineApplication.findOne);

  // Update amaster with id
  router.put("/:id",isValid,onlineApplication.update);

  // Delete amaster with id
  router.delete("/:id",isValid,onlineApplication.delete);

  // Delete all Tutorials
  router.delete("/",isValid,onlineApplication.deleteAll);

  app.use('/api/onlineapplication', router);
};
