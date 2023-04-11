var db = require("./db.js");

let model = {
    signup: (input, cb) => {

        let data = {
            id: input.id,
            username: input.username,
            password: input.password,
            email: input.email,
            first_name: input.first_name,
            last_name: input.last_name
          //  is_active: 1
        };
        
        return db.query("INSERT INTO users SET ?", [data], cb)
    },
    
    pwdchange:(input, cb) => {

        let data = {
            username: input.username,
            oldpassword: input.oldpassword,
            password: input.password,
            passconf: input.passconf,
              //  is_active: 1
            };
        
       // console.log("update users SET username = ?, password = ? WHERE username = ? and password=?", [data.username,data.password,data.username,data.oldpassword])
        return db.query("update users SET username = ?, password = ? WHERE username = ? ", [data.username,data.password,data.username], cb)
    },

   findOne: (username, cb) => {
        return db.query("SELECT * FROM users WHERE username=? ", [username], cb);
    },
    findById: (id, cb) => {
        return db.query("SELECT * FROM users WHERE id=? ", [id], cb);
    },

   
    }



module.exports = model;