var jwt = require('jsonwebtoken');
const conn = require('../configuration/db_conention')
const bcrypt = require('bcrypt');
// const saltRounds = 10;

exports.login = (req, res, next) => {
    let user = req.body.user;
    let password = req.body.password;

     //Protect SQL injection
     conn.execute('SELECT * FROM users WHERE urole = 0 AND  user = ?', 
     [user], 
     (err, users, fields) => {
       if(err) {
         res.json({
           status : "Error",
           message: err
         })
         return
       }
       if(user.length == 0) {
         res.json({
           status : "Error",
           message: "No user found."
         })
         return
       }
       
        //Promise 
        bcrypt.compare(req.body.password, users[0].password).then(function(isLogin) {
                // console.log(isLogin)
                console.log([0]);
            if(isLogin){
              var token = jwt.sign({ user: users[0].user }, process.env.SECRET, { expiresIn: '2h' }, { algorithms: ['HS256'] });
                res.json({
                    status: "success",
                    message: "login success",
                    token: token
                  })
            } else {
                res.json({
                    status: "error",
                    message: "login failed"
                  })
            }
        })
        .catch(err => res.json(err))
     }
   )
}