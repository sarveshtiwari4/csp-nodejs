const sql = require("./db.js");

// constructor
const Notification = function(notification) {
  this.item_code = notification.item_code;
  this.advt_no = notification.advt_no;
  this.link = notification.link;
  this.details = notification.details;
  this.published = notification.published
};

Notification.create = (newNoti, result) => {
  sql.query("INSERT INTO notification SET ?", newNoti, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(err, null);
      return;
    }

   // console.log("created Home: ", { id: res.insertNoti, ...newNoti });
    result(null, { id: res.insertNoti, ...newNoti });
  });
};

Notification.findById = (id, result) => {
  sql.query(`SELECT * FROM notification WHERE id = ${id}`, (err, res) => {
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

Notification.getAll = (title, result) => {
  let query = "SELECT * FROM notification";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("notification: ", res);
    result(null, res);
  });
};

Notification.getAllPublished = notification => {
  sql.query("SELECT * FROM notification where published=1 order by item_code desc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      notification(null, err);
      return;
    }

  //  console.log("notification: ", res);
  notification(null, res);
  });
};

Notification.updateById = (id, notification, result) => {
  sql.query(
    "UPDATE notification SET advt_no = ?, link = ?, details = ?, published = ? WHERE item_code = ?",
    [notification.advt_no, notification.link, notification.details, notification.published,id],
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

      console.log("updated Notification: ", { id: id, ...notification });
      result(null, { id: id, ...notification });
    }
  );
};

Notification.remove = (id, result) => {
  sql.query("DELETE FROM notification WHERE id = ?", id, (err, res) => {
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

Notification.removeAll = result => {
  sql.query("DELETE FROM notification", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} notification`);
    result(null, res);
  });
};

module.exports = Notification;
