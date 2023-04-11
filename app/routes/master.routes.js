module.exports = app => {
  const isValid = require("./verifyToken");

  console.log("200");
  const master = require("../controllers/master.controller.js");

  
  var router = require("express").Router();

  // Create a newmaster
  router.post("/",isValid, master.create);

  // Retrieve all Tutorials
  router.get("/",master.findAll);

  // Retrieve all published Tutorials
  router.get("/published",master.findAllPublished);

  // Retrieve a singlemaster with id
  router.get("/:id",master.findOne);

  // Update amaster with id
  router.put("/:id",isValid,master.update);

  // Delete amaster with id
  router.delete("/:id",isValid,master.delete);

  // Delete all Tutorials
  router.delete("/",isValid,master.deleteAll);

  app.use('/api/master', router);
};
