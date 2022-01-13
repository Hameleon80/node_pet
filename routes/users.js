//include modules
var express = require('express');
const createHttpError = require('http-errors');
var mysql = require('../database/mysql.js');
const UserControl = require('../control/usersControl')

//variables
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registration', UserControl.registration);
router.post('/auth', UserControl.authorisation)

router.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error');
});


module.exports = router;
