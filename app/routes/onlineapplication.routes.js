module.exports = app => {
  //const isvalid = require("../auth");
  console.log("200");
  const onlineApplication = require("../controllers/onlineapplication.controller.js");

  
  var router = require("express").Router();

  // Create a newmaster
  router.post("/", onlineApplication.create);

  // Retrieve all Tutorials
  router.get("/",onlineApplication.findAll);

  // Retrieve all published Tutorials
  router.get("/published",onlineApplication.findAllPublished);

  // Retrieve a singlemaster with id
  router.get("/:id",onlineApplication.findOne);

  // Update amaster with id
  router.put("/:id",onlineApplication.update);

  // Delete amaster with id
  router.delete("/:id",onlineApplication.delete);

  // Delete all Tutorials
  router.delete("/",onlineApplication.deleteAll);

  app.use('/api/onlineapplication', router);
};
