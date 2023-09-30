const conn = require('../configuration/db_conention')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = (req, res, next) => {
  let user = req.body.user;
  let password = req.body.password;
  

  
  if(user == '' || user == undefined || user == null) {
    res.json({
      status: "Error",
      message: "Pleas fill your User."
    })
  } else if (password == '' || password == undefined || password == null) {
    res.json({
      status: "Error",
      message: "Pleas fill your Password."
    })
  } else {
    //Hash password with Bcrypt
    bcrypt.hash(password, saltRounds, function(err, hash) {
        
      //Protect SQL injection
      conn.execute('INSERT INTO users (user, password) VALUES(?, ?)', 
        [user, hash], 
        (err, results, fields) => {
          if(err) {
            res.json({
              status : "Error",
              message: err
            })
            return
          }
          res.json({
            status: "Successful",
            data: results
          })
        }
      )
    });      
  }
  


  
  
}