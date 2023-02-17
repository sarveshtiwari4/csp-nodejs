module.exports = app => {
  //const isvalid = require("../auth");
  console.log("200");
  const advertisement = require("../controllers/advertisement.controller.js");

  
  var router = require("express").Router();

  // Create a new advertisement
  router.post("/", advertisement.create);

  // Retrieve all Tutorials
  router.get("/", advertisement.findAll);

  // Retrieve all published Tutorials
  router.get("/published",advertisement.findAllPublished);

  // Retrieve a single advertisement with id
  router.get("/:id", advertisement.findOne);

  // Update a advertisement with id
  router.put("/:id", advertisement.update);

  // Delete a advertisement with id
  router.delete("/:id", advertisement.delete);

  // Delete all Tutorials
  router.delete("/", advertisement.deleteAll);

  app.use('/api/advertisement', router);
};
