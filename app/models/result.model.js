const sql = require("./db.js");

// constructor
const Result = function(result) {

    this.item_code = result.item_code;
    this.advt_no = result.advt_no;
    this.link = result.link;
    this.details = result.details;
    this.published = result.published;
    
};

Result.create = (newResult, result) => {
  sql.query("INSERT INTO result SET ?", newResult, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Result: ", { item_code: res.insertResult, ...newResult });
    result(null, { item_code: res.insertResult, ...newResult });
  });
};

Result.findById = (advt_no, result) => {
  sql.query(`SELECT * FROM result WHERE published=1 and advt_no = ${advt_no}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Result: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Result with the id
    result({ kind: "not_found" }, null);
  });
};

Result.getAll = (title_code, result) => {
  let query = "SELECT * FROM  result  where  published=1";
  console.log("500");
  if (title_code) {
    query += ` WHERE title LIKE '%${title_code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

Result.getAllPublished = result => {
  sql.query("SELECT * FROM result where published=1 order by item_code desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

  //  console.log("result: ", res);
    result(null, res);
  });
};

Result.updateById = (id, Result, result) => {
  sql.query(
    "UPDATE result SET advt_no = ?, link = ?, details = ?, published = ? WHERE item_code = ?",
    [Result.advt_no, Result.link, Result.details, Result.published,id],
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

      console.log("updated Result: ", { id: id, ...Result });
      result(null, { id: id, ...Result });
    }
  );
};

Result.remove = (id, result) => {
  sql.query("DELETE FROM result WHERE id = ?", id, (err, res) => {
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

    console.log("deleted Result with id: ", id);
    result(null, res);
  });
};

Result.removeAll = result => {
  sql.query("DELETE FROM result", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} result`);
    result(null, res);
  });
};

module.exports = Result;
