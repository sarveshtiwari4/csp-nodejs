const Result = require("../models/result.model.js");
console.log("300");
// Create and Save a new result
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a result
  const result = new Result({
    item_code: req.body.txtitemcode,
    advt_no:req.body.txtadvtno2,
    details: req.body.txtdetails,
    link: req.body.txtlink,
    published: req.body.txtpublished2 
  });

  // Save result in the database
  Result.create(result, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the result."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title_code = req.query.title_code;
  console.log("400");
  Result.getAll(title_code, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single result by Id
exports.findOne = (req, res) => {
  Result.findById(req.params.id, (err, data) => {
    console.log(req.params.id);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found result with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving result with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished= (req, res) => {
 // console.log( req.headers);
  Result.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a result identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  const result = new Result({
    item_code: req.body.txtitemcode,
    advt_no:req.body.txtadvtno2,
    details: req.body.txtdetails,
    link: req.body.txtlink,
    published: req.body.txtpublished2 
  });

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Result.updateById(
    req.params.id,
    result,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found result with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating result with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a result with the specified id in the request
exports.delete = (req, res) => {
  Result.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found result with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete result with id " + req.params.id
        });
      }
    } else res.send({ message: `result was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Result.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
