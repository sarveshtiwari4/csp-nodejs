module.exports = app => {
  const isValid = require("./verifyToken");
  

  const notification = require("../controllers/notification.controller.js");
  
  var router = require("express").Router();

  // Create a new notification
  router.post("/", isValid, notification.create);

  // Retrieve all Tutorials
  router.get("/", notification.findAll);

  // Retrieve all published Tutorials
  router.get("/published",notification.findAllPublished);

  // Retrieve a single notification with id
  router.get("/:id", notification.findOne);

  // Update a notification with id
  router.put("/:id", isValid,notification.update);

  // Delete a notification with id
  router.delete("/:id", isValid,notification.delete);

  // Delete all Tutorials
  router.delete("/", isValid,notification.deleteAll);

  app.use('/api/notification', router);

};
