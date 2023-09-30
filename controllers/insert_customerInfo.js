// const secret = 'secrete-key-api-2023';
var jwt = require('jsonwebtoken');
const conn = require('../configuration/db_conention')

exports.insert_customerInfo = (req, res, next) => {
    
    let pet_name = req.body.pet_name
    let pet_type = req.body.pet_type
    let pet_species = req.body.pet_species
    let pet_weight = req.body.pet_weight
    let arrived_date = req.body.arrived_date
    let owner_name = req.body.owner_name
    let phone = req.body.phone
    let lates_price = req.body.lates_price
    let create_by = req.body.create_by
    let remark = req.body.remark
    

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
               
                conn.execute('INSERT INTO customers_detail (pet_name, pet_type, pet_species, pet_weight, arrived_date, owner_name, phone, lates_price, create_by, remark) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', 
                [pet_name, pet_type, pet_species, pet_weight, arrived_date, owner_name, phone, lates_price, create_by, remark],
                    (err, info, fields) => {
                        if(err) {
                            res.json({
                            status : "Error",
                            message: err
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