module.exports = app => {
  const isValid = require("./verifyToken");

 
  const modelanswer = require("../controllers/modelanswer.controller.js");

  
  var router = require("express").Router();

  // Create a newmaster
  router.post("/",isValid, modelanswer.create);

  // Retrieve all Tutorials
  router.get("/",modelanswer.findAll);

  // Retrieve all published Tutorials
  router.get("/published",modelanswer.findAllPublished);

  // Retrieve a singlemaster with id
  router.get("/:id",modelanswer.findOne);

  // Update amaster with id
  router.put("/:id",isValid,modelanswer.update);

  // Delete amaster with id
  router.delete("/:id",isValid,modelanswer.delete);

  // Delete all Tutorials
  router.delete("/",isValid,modelanswer.deleteAll);

  app.use('/api/modelanswer', router);
};
