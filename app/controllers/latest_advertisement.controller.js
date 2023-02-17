const Advertisement = require("../models/latest_advertisement.model.js");

console.log("300");
// Create and Save a new advertisement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a advertisement
  const advertisement = new Advertisement({
    item_code: req.body.txtitemcode,
    advt_no:req.body.txtadvtno2,
    details: req.body.txtdetails,
    link: req.body.txtlink,
    published: req.body.txtpublished2 
  });

  // Save advertisement in the database
  Advertisement.create(advertisement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the advertisement."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title_code = req.query.title_code;
  console.log("400");
  Advertisement.getAll(title_code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single advertisement by Id
exports.findOne = (req, res) => {
  Advertisement.findById(req.params.id, (err, data) => {
    
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found advertisement with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving advertisement with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
 // console.log( req.headers);
  Advertisement.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a advertisement identified by the id in the request
exports.update = (req, res) => {
  const advertisement = new Advertisement({
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

  
  console.log(" Controller:"& req.body);

  Advertisement.updateById(
    req.params.id,
    advertisement,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found advertisement with id ${req.params.id}`
          });
        } else {
          res.status(500).send({
            message: "Error updating advertisement with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a advertisement with the specified id in the request
exports.delete = (req, res) => {
  Advertisement.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found advertisement with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete advertisement with id " + req.params.id
        });
      }
    } else res.send({ message: `advertisement was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Advertisement.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
