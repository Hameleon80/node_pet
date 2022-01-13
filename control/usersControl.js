//import User and Role
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
            const hashPassword = bcrypt.hashSync(password, saltRounds)
            const role = await Role.find("USER")
            const newUser = new User({login: login, password: hashPassword, role: [role]})
            await newUser.save()
            resp.render('index', {title: "Main page", registration: "true"})
        }catch (e){
            console.log(e);
            throw new Error('Registration error')
        }
    }

    async authorisation(req, resp){
        try{
            const{login, password} = req.body
            const candidate = await User.findOne({user: login})
            if(!bcrypt.compare(password, candidate.password)){
                console.log("Не верный пароль")
                throw new Error("Не верный пароль")
            }
            resp.render('index', {title: "Main page", authorised: true, user: login})
        }catch (e){
            console.log(e);
            throw new Error("Login error")
        }
    }

    async getRegisterPage(req, resp){
        try{

        }catch(e){
            console.log(e)
            throw new Error('Can\'t find page')
        }
    }
}

module.exports = new Users();