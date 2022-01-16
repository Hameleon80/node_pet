//import User and Role
const User = require('../model/User')
const Role = require('../model/Role')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')
const app = require('../app')

//variables
const saltRounds = 5

//class contains methods to requests processing
class Users{
    async registration(req, resp){
        try{
            const{login, password} = req.body
            const candidate = await User.findOne({login})
            if (candidate){
                throw new Error("Такой пользователь уже существует")
            }
            const hashPassword = bcrypt.hashSync(password, saltRounds)
            const role = await Role.findOne({value: "USER"})
            const newUser = new User({login: login, password: hashPassword, role: [role.value]})
            await newUser.save()
            resp.render('registrationSuccess', {registrationMessage: "Пользователь успешно зарегестрирован"})
        }catch (e){
            console.log(e);
            resp.locals.message = e.message;
            resp.locals.error = req.app.get('env') === 'development' ? e : {};
            resp.status(e.code || 404);
            resp.render('error');
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
            resp.locals.message = e.message;
            resp.locals.error = req.app.get('env') === 'development' ? e : {};
            resp.status(e.code || 404);
            resp.render('error');
        }
    }

    async getRegisterPage(req, resp){
        try{
            resp.render('registration')
        }catch(e){
            console.log(e)
            resp.locals.message = e.message;
            resp.locals.error = req.app.get('env') === 'development' ? e : {};
            resp.status(e.code || 404);
            resp.render('error');
        }
    }
}

module.exports = new Users();