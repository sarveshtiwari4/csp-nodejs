

const Notification = require("../models/notification.model.js");

// Create and Save a new notification
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a notification
  const notification = new Notification({
      item_code: req.body.txtitemcode,
      advt_no:req.body.txtadvtno2,
      details: req.body.txtdetails,
      link: req.body.txtlink,
      published: req.body.txtpublished2 
  });

  // Save notification in the database
  Notification.create(notification, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the notification."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Notification.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single notification by Id
exports.findOne = (req, res) => {
  Notification.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found notification with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving notification with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
 // console.log( req.headers);
  Notification.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a notification identified by the id in the request
exports.update = (req, res) => {

  const notification = new Notification({
    item_code: req.body.txtitemcode,
    advt_no:req.body.txtadvtno2,
    details: req.body.txtdetails,
    link: req.body.txtlink,
    published: req.body.txtpublished2 
});

  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Notification.updateById(
    req.params.id,
    notification,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found notification with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating notification with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a notification with the specified id in the request
exports.delete = (req, res) => {
  Notification.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found notification with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete notification with id " + req.params.id
        });
      }
    } else res.send({ message: `notification was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Notification.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
