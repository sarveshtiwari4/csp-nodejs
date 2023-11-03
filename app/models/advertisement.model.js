const sql = require("./db.js");

// constructor
const Advertisement = function(advertisement) {

  this.item_code = advertisement.item_code;
  this.advt_no = advertisement.advt_no;
  this.link = advertisement.link;
  this.details = advertisement.details;
  this.published = advertisement.published;
  
};

Advertisement.create = (newAdv, result) => {
  sql.query("INSERT INTO advertisement SET ?; UPDATE master SET item_code=? WHERE advt_No=?", [newAdv,newAdv.item_code,newAdv.advt_no], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Advertisement: ", { item_code: res.insertAdv, ...newAdv });
   result(null, { item_code: res.insertAdv, ...newAdv });
  });
};

Advertisement.findById = (id, result) => {
  sql.query(`SELECT * FROM advertisement WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Advertisement: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Advertisement with the id
    result({ kind: "not_found" }, null);
  });
};

Advertisement.getAll = (title_code, result) => {
  let query = "SELECT * FROM advertisement";
  
  if (title_code) {
    query += ` WHERE title LIKE '%${title_code}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("advertisement: ", res);
    result(null, res);
  });
};

Advertisement.getAllPublished = result => {
  sql.query("SELECT * FROM advertisement where published=1 order by advt_no desc, item_code desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

  //  console.log("advertisement: ", res);
    result(null, res);
  });
};

Advertisement.updateById = (id, advertisement, result) => {
  sql.query(
    "UPDATE advertisement SET advt_no = ?, link = ?, details = ?, published = ? WHERE item_code = ?",
    [advertisement.advt_no, advertisement.link, advertisement.details, advertisement.published,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(id);
      console.log(res.affectedRows);

      if (res.affectedRows == 0) {
        // not found Advertisement with the item_code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Advertisement: ", { id: id, ...advertisement });
      result(null, { id: id, ...advertisement });
    }
  );
};

Advertisement.remove = (id, advertisement) => {
  sql.query("DELETE FROM advertisement WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      advertisement(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Advertisement with the id
      advertisement({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Advertisement with id: ", id);
    advertisement(null, res);
  });
};

Advertisement.removeAll = advertisement => {
  sql.query("DELETE FROM advertisement", (err, res) => {
    if (err) {
      console.log("error: ", err);
      advertisement(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} advertisement`);
    advertisement(null, res);
  });
};

module.exports = Advertisement;
