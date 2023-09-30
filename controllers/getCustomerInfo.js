// const secret = 'secrete-key-api-2023';
var jwt = require('jsonwebtoken');
const conn = require('../configuration/db_conention')

exports.getCustomerInfo = (req, res, next) => {
    let pet_name = req.body.pet_name
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    try {
        var decoded = jwt.verify(token, process.env.SECRET, (err, result) => {
            if(err) {
                res.json({
                    status: "Error",
                    err
                })
            } else {
                conn.execute('SELECT * FROM customers_detail WHERE trash = 0 AND  pet_name = ?', 
                    [pet_name], 
                    (err, info, fields) => {
                        if(err) {
                            res.json({
                            status : "Error",
                            message: err
                            })
                            return
                        }
                        if(pet_name.length == 0) {
                            res.json({
                            status : "Error",
                            message: "No user found."
                            })
                            return
                        }
                        
                        res.json({
                            status: "success",
                            message: "Your info",
                            data: info
                          })
                        
                        
                    }
                )
            }
        });
    }  catch (err) {
        res.json({
            status: "Error",
            message: err
        })
    }   
}