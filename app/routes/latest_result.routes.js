module.exports = app => {
  const isValid = require("./verifyToken");

  console.log("200");
  const result = require("../controllers/latest_result.controller.js");

  
  var router = require("express").Router();

  // Create a new result
  router.post("/", isValid,result.create);

  // Retrieve all Tutorials
  router.get("/", result.findAll);

  // Retrieve all published Tutorials
  router.get("/published",result.findAllPublished);

  // Retrieve a single result with id
  router.get("/:id", result.findOne);

  // Update a result with id
  router.put("/:id",isValid, result.update);

  // Delete a result with id
  router.delete("/:id", isValid,result.delete);

  // Delete all Tutorials
  router.delete("/",isValid, result.deleteAll);

  app.use('/api/latest_result', router);
};
