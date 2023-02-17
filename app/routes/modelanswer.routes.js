module.exports = app => {
  //const isvalid = require("../auth");
  console.log("200");
  const modelanswer = require("../controllers/modelanswer.controller.js");

  
  var router = require("express").Router();

  // Create a newmaster
  router.post("/", modelanswer.create);

  // Retrieve all Tutorials
  router.get("/",modelanswer.findAll);

  // Retrieve all published Tutorials
  router.get("/published",modelanswer.findAllPublished);

  // Retrieve a singlemaster with id
  router.get("/:id",modelanswer.findOne);

  // Update amaster with id
  router.put("/:id",modelanswer.update);

  // Delete amaster with id
  router.delete("/:id",modelanswer.delete);

  // Delete all Tutorials
  router.delete("/",modelanswer.deleteAll);

  app.use('/api/modelanswer', router);
};
