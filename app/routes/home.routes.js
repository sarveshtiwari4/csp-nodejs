module.exports = app => {
  const isValid = require("./verifyToken");

  const home = require("../controllers/home.controller.js");
  
  var router = require("express").Router();

  // Create a new home
  router.post("/",isValid, home.create);

  // Retrieve all Tutorials
  router.get("/" , home.findAll);

  // Retrieve all published Tutorials
  router.get("/published", home.findAllPublished);

  router.get("/publishedtop5",home.findAllPublishedtop5);

  // Retrieve a single home with id
  router.get("/:id", home.findOne);

  // Update a home with id
  router.put("/:id", isValid,home.update);

  // Delete a home with id
  router.delete("/:id",isValid, home.delete);

  // Delete all Tutorials
  router.delete("/", isValid,home.deleteAll);

  app.use('/api/home', router);

};
