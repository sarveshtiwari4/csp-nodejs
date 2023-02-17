const sql = require("./db.js");

// constructor
const Modelanswer = function(modelanswer) {
  this.item_code = modelanswer.item_code;
  this.advt_no = modelanswer.advt_no;
  this.link = modelanswer.link;
  this.details = modelanswer.details;
  this.published = modelanswer.published;
};

Modelanswer.create = (newMa, modelanswer) => {
  sql.query("INSERT INTO modelanswer SET ?", newMa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      modelanswer(err, null);
      return;
    }

    console.log("created Result: ", { item_code: res.insertMa, ...newMa });
    modelanswer(null, { item_code: res.insertMa, ...newMa });
  });
};

Modelanswer.findById = (id, modelanswer) => {
  sql.query(`SELECT * FROM modelanswer WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      modelanswer(err, null);
      return;
    }

    if (res.length) {
      console.log("found Result: ", res[0]);
      modelanswer(null, res[0]);
      return;
    }

    // not found Result with the id
    modelanswer({ kind: "not_found" }, null);
  });
};

Modelanswer.getAll = (advt_no, modelanswer) => {
  let query = "SELECT * FROM modelanswer";
  
  if (advt_no) {
    query += ` WHERE title LIKE '%${advt_no}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      modelanswer(null, err);
      return;
    }

    console.log("modelanswer: ", res);
    modelanswer(null, res);
  });
};

Modelanswer.getAllPublished = modelanswer => {
  sql.query("SELECT * FROM modelanswer where published=1 order by item_code desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      modelanswer(null, err);
      return;
    }

  //  console.log("modelanswer: ", res);
    modelanswer(null, res);
  });
};

Modelanswer.updateById = (id,  modelanswer,result) => {
  sql.query(
    "UPDATE modelanswer SET advt_no = ?, link = ?, details = ?, published = ? WHERE item_code = ?",
    [modelanswer.advt_no, modelanswer.link, modelanswer.details, modelanswer.published,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Result with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Modal answer: ", { id: id, ...modelanswer });
      result(null, { id: id, ...modelanswer });
    }
  );
};

Modelanswer.remove = (id, modelanswer) => {
  sql.query("DELETE FROM modelanswer WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      modelanswer(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Result with the id
      modelanswer({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Result with id: ", id);
    modelanswer(null, res);
  });
};

Modelanswer.removeAll = modelanswer => {
  sql.query("DELETE FROM modelanswer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      modelanswer(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} modelanswer`);
    modelanswer(null, res);
  });
};

module.exports = Modelanswer;
