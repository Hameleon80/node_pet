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

router.post('/', (req, res, next)=>{
  //get login and password from request
  var login = req.body.login,
      password = req.body.password;
  var flag = mysql.authentication(login, password);
  
  if(flag){
      res.render('index', {title: 'Connected'});
  } else {
      next(createHttpError(404));
  }
});

router.post('/registration', UserControl.registration);

router.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error');
});


module.exports = router;
