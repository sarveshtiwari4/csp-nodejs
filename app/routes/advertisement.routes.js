module.exports = app => {
  const isValid = require("./verifyToken");
  
  console.log("200");
  const advertisement = require("../controllers/advertisement.controller.js");

  
  var router = require("express").Router();

  // Create a new advertisement
  router.post("/", isValid,advertisement.create);

  // Retrieve all Tutorials
  router.get("/", advertisement.findAll);

  // Retrieve all published Tutorials
  router.get("/published",advertisement.findAllPublished);

  // Retrieve a single advertisement with id
  router.get("/:id", advertisement.findOne);

  // Update a advertisement with id
  router.put("/:id", isValid,advertisement.update);

  // Delete a advertisement with id
  router.delete("/:id", isValid,advertisement.delete);

  // Delete all Tutorials
  router.delete("/", isValid,advertisement.deleteAll);

  app.use('/api/advertisement', router);
};
