

const Home = require("../models/home.model.js");

// Create and Save a new home
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a home
  const home = new Home({
    item_code: req.body.txtitemcode,
    advt_no:req.body.txtadvtno2,
    details: req.body.txtdetails,
    link: req.body.txtlink,
    published: req.body.txtpublished2 
  });

  // Save home in the database
  Home.create(home, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the home."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Home.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single home by Id
exports.findOne = (req, res) => {
  Home.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found home with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving home with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
 // console.log( req.headers);
  Home.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAllPublishedtop5 = (req, res) => {
  // console.log( req.headers);
   Home.getAllPublishedtop5((err, data) => {
     if (err)
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving tutorials."
       });
     else res.send(data);
   });
 };



// Update a home identified by the id in the request
exports.update = async (req, res) => {
  
  const home = new Home({
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

  await Home.updateById( req.params.id,home,(err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found home with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating home with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a home with the specified id in the request
exports.delete = (req, res) => {
  Home.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found home with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete home with id " + req.params.id
        });
      }
    } else res.send({ message: `home was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Home.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
