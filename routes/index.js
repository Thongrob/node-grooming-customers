var express = require('express');
var router = express.Router();
const {register} = require('../controllers/register');
const {login} = require('../controllers/login');
const {auth} = require('../controllers/auth');
const {getInfo} = require('../controllers/getInfo');
const {insert_customerInfo} = require('../controllers/insert_customerInfo');
const {getCustomerInfo} = require('../controllers/getCustomerInfo');

/* GET home page. */
router.post('/register', register);
router.post('/login', login);
router.post('/auth', auth);
router.post('/getInfo', getInfo);
router.post('/insert_customerInfo', insert_customerInfo);
router.post('/getCustomerInfo', getCustomerInfo);

module.exports = router;
