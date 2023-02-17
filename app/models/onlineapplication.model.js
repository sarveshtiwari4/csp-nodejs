const sql = require("./db.js");

// constructor
const OnlineApplication = function(onlineApplication) {
   this.item_code = onlineApplication.item_code;
   this.advt_no = onlineApplication.advt_no;
   this.link = onlineApplication.link;
   this.details = onlineApplication.details;
   this.published = onlineApplication.published;

};

OnlineApplication.create = (newOA, onlineApplication) => {
  sql.query("INSERT INTO onlineapplication SET ?", newOA, (err, res) => {
    if (err) {
      console.log("error: ", err);
      onlineApplication(err, null);
      return;
    }

    console.log("created Result: ", { item_code: res.insertOA, ...newOA });
    onlineApplication(null, { item_code: res.insertOA, ...newOA });
  });
};

OnlineApplication.findById = (id, onlineApplication) => {
  sql.query(`SELECT * FROM onlineapplication WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      onlineApplication(err, null);
      return;
    }

    if (res.length) {
      console.log("found Result: ", res[0]);
      onlineApplication(null, res[0]);
      return;
    }

    // not found Result with the id
    onlineApplication({ kind: "not_found" }, null);
  });
};

OnlineApplication.getAll = (advt_no, onlineApplication) => {
  let query = "SELECT * FROM onlineapplication";
  
  if (advt_no) {
    query += ` WHERE title LIKE '%${advt_no}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      onlineApplication(null, err);
      return;
    }

    console.log("onlineApplication: ", res);
    onlineApplication(null, res);
  });
};

OnlineApplication.getAllPublished = onlineApplication => {
  sql.query("SELECT * FROM onlineapplication where published=1 order by item_code desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      onlineApplication(null, err);
      return;
    }

  //  console.log("onlineApplication: ", res);
    onlineApplication(null, res);
  });
};

OnlineApplication.updateById = (id,  onlineApplication, result) => {
  sql.query(
    "UPDATE onlineapplication SET advt_no = ?, link = ?, details = ?, published = ? WHERE item_code = ?",
    [onlineApplication.advt_no, onlineApplication.link, onlineApplication.details,onlineApplication.published,id],
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

      console.log("updated Online Application: ", { id: id, ...onlineApplication });
       result(null, { id: id, ...onlineApplication });
    }
  );
};

OnlineApplication.remove = (id, onlineApplication) => {
  sql.query("DELETE FROM onlineapplication WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      onlineApplication(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Result with the id
      onlineApplication({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Result with id: ", id);
    onlineApplication(null, res);
  });
};

OnlineApplication.removeAll = onlineApplication => {
  sql.query("DELETE FROM onlineapplication", (err, res) => {
    if (err) {
      console.log("error: ", err);
      onlineApplication(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} onlineApplication`);
    onlineApplication(null, res);
  });
};

module.exports = OnlineApplication;
