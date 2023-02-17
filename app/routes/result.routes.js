module.exports = app => {
  //const isvalid = require("../auth");
  console.log("200");
  const result = require("../controllers/result.controller.js");

  
  var router = require("express").Router();

  // Create a new result
  router.post("/", result.create);

  // Retrieve all Tutorials
  router.get("/", result.findAll);

  // Retrieve all published Tutorials
  router.get("/published",result.findAllPublished);

  // Retrieve a single result with id
  router.get("/:id", result.findOne);

  // Update a result with id
  router.put("/:id", result.update);

  // Delete a result with id
  router.delete("/:id", result.delete);

  // Delete all Tutorials
  router.delete("/", result.deleteAll);

  app.use('/api/result', router);
};
