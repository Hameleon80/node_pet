//import User and Role
const createError = require('http-errors')
const User = require('../model/User')
const Role = require('../model/Role')
const bcrypt = require('bcryptjs')

//variables
const saltRounds = 5

//class contains methods to requests processing
class Users{
    async registration(req, resp){
        try{
            const{login, password} = req.body
            const candidate = await User.find(login)
            if (candidate){
                throw new Error('Пользователь с таким именем уже существует')
            }
            return resp.status(200).json({message: 'Пользователь создан'})
        }catch (e){
            console.log(e);
            throw new Error('Registration error')
        }
    }

    async authorisation(req, resp){
        try{
            const{login, password} = req.body
            console.log(`Login: ${login}, password: ${password}`)
            const candidate = await User.findOne({user: login})
            if(!bcrypt.compare(password, candidate.password)){
                console.log("Не верный пароль")
                throw new Error("Не верный пароль")
            }
            resp.render('index', {title: "Main page", authorised: "true"})
        }catch (e){
            console.log(e);
            resp.locals.message = "Login error"
            resp.locals.error = e
            resp.status(400)
            resp.render('error')
        }
    }
}

module.exports = new Users();