
const sql=require("./db");
var bcrypt = require('bcrypt');
//const jwt = require("../env")
const jwt = require('jsonwebtoken');
let jwtSecretKey = 'testjhhhg';
const Login = function(user) {

    this.username = user.username;
    this.password = user.password;
    this.id=user.id;
    //this.published = tutorial.published;
  };
 

 findOne:(username, cb) => {
    return db.query("SELECT * FROM users WHERE username=? ", [username], cb);
    },

    
  Login.getUser = (data, result) => {
      //console.log(data);
  
       
        sql.query(`SELECT * FROM users where username=? and password=?`
        ,[data.username,data.password], function (error, results) {
          // When done with the connection, release it.
        
       
          // Handle error after the release.
          if (error) throw error;
          
          let user=results[0];

          const payload={
            userid:user.id
          }
         //console.log(payload);
 
         // bcrypt.compare(data.password, user.password )
            
          const token = jwt.sign(payload, jwtSecretKey);

          
           result(null, token);
           console.log(token);
          
           
        // return result(null, results);
          // Don't use the connection here, it has been returned to the pool.
        });
      };
  
  Login.addUser = (data, result) => {
      console.log(data)
    sql.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
        connection.query(`insert into users (id,username,password,email,first_name,last_name) values(?,?,?,?,?,?)`
        ,[data.id,data.username,data.password,data.email, data.first_name, data.last_name], 
        function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
          // Handle error after the release.
          if (error) throw error;

       
          let datau = {
            username:data.username,email:data.email
          }
        
          const token = jwt.sign(datau, jwtSecretKey);
        //  console.log(token,datau,jwtSecretKey)

          return result(null, token);
          // Don't use the connection here, it has been returned to the pool.
        });
      });
  };


  module.exports = Login;