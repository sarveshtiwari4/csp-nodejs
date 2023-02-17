const master = require("../models/master.model.js");
console.log("300");
// Create and Save a newmaster
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create amaster
  const Master = new master({
    item_code:req.body.txtitemcode,
    advt_no: req.body.txtadvtno,
    details: req.body.txtadvtdetails,
    published: req.body.txtpublished 
  });

  // Savemaster in the database
 master.create(Master, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating themaster."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title_code = req.query.title_code;
  console.log("400");
 master.getAll(title_code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a singlemaster by Id
exports.findOne = (req, res) => {
 master.findById(req.params.id, (err, data) => {
    
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not foundmaster with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrievingmaster with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
 // console.log( req.headers);
 master.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update amaster identified by the id in the request
exports.update = (req, res) => {

  const Master = new master({
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

 master.updateById(
    req.params.id,
    Master,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not foundmaster with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updatingmaster with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete amaster with the specified id in the request
exports.delete = (req, res) => {
 master.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not foundmaster with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not deletemaster with id " + req.params.id
        });
      }
    } else res.send({ message: `advertisement was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
 master.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
