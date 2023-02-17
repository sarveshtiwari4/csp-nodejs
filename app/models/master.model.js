const sql = require("./db.js");

// constructor
const Master = function(master) {
  this.item_code  = master.item_code;
  this.advt_no = master.advt_no;
  this.details = master.details;
   this.published = master.published;
};

Master.create = (newMaster, master) => {
  sql.query("INSERT INTO master SET ?", newMaster, (err, res) => {
    if (err) {
      console.log("error: ", err);
      master(err, null);
      return;
    }

    console.log("created Result: ", { advt_no: res.insertadvt_no, ...newMaster });
    master(null, { advt_no: res.insertadvt_no, ...newMaster });
  });
};

Master.findById = (id, master) => {
  sql.query(`SELECT * FROM master WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      master(err, null);
      return;
    }

    if (res.length) {
      console.log("found Result: ", res[0]);
      master(null, res[0]);
      return;
    }

    // not found Result with the id
    master({ kind: "not_found" }, null);
  });
};

Master.getAll = (advt_no, master) => {
  let query = "SELECT * FROM advertisement where published=1 union  SELECT * FROM notification where published=1 union  SELECT * FROM modelanswer where published=1 union  SELECT * FROM result where published=1 union  SELECT * FROM onlineapplication where published=1 order by item_code desc ";
  
  //if (advt_no) {
    //query += ` WHERE title LIKE '%${advt_no}%'`;
  //}

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      master(null, err);
      return;
    }

    console.log("master: ", res);
    master(null, res);
  });
};

Master.getAllPublished = master => {
  sql.query("SELECT * FROM master where published=1 order by advt_no desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      master(null, err);
      return;
    }

  //  console.log("master: ", res);
    master(null, res);
  });
};

Master.updateById = (id,  master,result) => {
  sql.query(
    "UPDATE master SET advt_no = ?, details = ?, published = ? WHERE item_code = ?",
    [master.advt_no , master.details, master.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        master(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Result with the id
        master({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Master Data: ", { id: id, ...master });
     result(null, { id: id, ...master });
    }
  );
};

Master.remove = (id, master) => {
  sql.query("DELETE FROM master WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      master(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Result with the id
      master({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Result with id: ", id);
    master(null, res);
  });
};

Master.removeAll = master => {
  sql.query("DELETE FROM master", (err, res) => {
    if (err) {
      console.log("error: ", err);
      master(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} master`);
    master(null, res);
  });
};

module.exports = Master;
