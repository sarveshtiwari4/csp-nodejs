const sql = require("./db.js");

// constructor
const Home = function(home) {

  this.item_code=home.item_code;
  this.advt_no=home.advt_no;
  this.details = home.details;
  this.link =home.link;
  this.published = home.published;
};

Home.create = (newHome, result) => {
  sql.query("INSERT INTO home SET ?", newHome, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Home: ", { item_code: res.inserthome, ...newHome });
    result(null, { item_code: res.inserthome, ...newHome });
  });
};

Home.findById = (id, result) => {
  sql.query(`SELECT * FROM home WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Home: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Home with the id
    result({ kind: "not_found" }, null);
  });
};

Home.getAll = (title, result) => {
  let query = "SELECT * FROM home";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("home: ", res);
    result(null, res);
  });
};

Home.getAllPublishedtop5 = result => {
  sql.query("SELECT * FROM home where published=1 order by item_code desc limit 5", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

  //  console.log("home: ", res);
    result(null, res);
  });
};



Home.getAllPublished = result => {
  sql.query("SELECT * FROM home where published=1 order by item_code desc ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

  //  console.log("home: ", res);
    result(null, res);
  });
};

Home.updateById = (id, home, result) => {
  sql.query(
    "UPDATE home SET advt_no = ?, link = ?, details = ?, published = ? WHERE item_code = ?",
    [home.advt_no, home.link, home.details, home.published,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Home with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Home: ", { id: id, ...home });
      result(null, { id: id, ...home });
    }
  );
};

Home.remove = (id, result) => {
  sql.query("DELETE FROM home WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Home with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Home with id: ", id);
    result(null, res);
  });
};

Home.removeAll = result => {
  sql.query("DELETE FROM home", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} home`);
    result(null, res);
  });
};

module.exports = Home;
