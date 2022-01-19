//include modules
const express = require('express');
const createHttpError = require('http-errors');
const mysql = require('../database/mysql.js');
const User = require('../model/User')
const Role = require('../model/Role')
const bcrypt = require('bcryptjs')

//variables
var router = express.Router()
const saltRounds = 5

/* GET users requests */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getRegisterPage', function (req, res, next) {
  try {
    res.render('registration')
  } catch (e) {
    return next(e)
  }
})

/* POST users requests */
router.post('/registration', async function (req, res, next) {
  try {
    const {login,password} = req.body
    const candidate = await User.findOne({login})
    if (candidate) {
      throw new Error("Такой пользователь уже существует")
    }
    const hashPassword = bcrypt.hashSync(password, saltRounds)
    const role = await Role.findOne({value: "USER"})
    const newUser = new User({
      login: login,
      password: hashPassword,
      role: [role.value]
    })
    await newUser.save()
    res.render('registrationSuccess', {
      registrationMessage: "Пользователь успешно зарегестрирован"
    })
  } catch (e) {
    return next(e)
  }
})

router.post('/auth', async function (req, res, next) {
  try {
    const {login,password} = req.body
    const candidate = await User.findOne({login})
    if(!candidate){
      throw new Error("Пользователь не зарегестрирован")
    }
    if (!bcrypt.compare(password, candidate.password)) {
      console.log("Не верный пароль")
      throw new Error("Не верный пароль")
    }
    res.cookie(login)
    res.render('index', {
      title: "Main page",
      authorised: true,
      user: login
    })
  } catch (e) {
    return next(e)
  }
})

module.exports = router;