//import User and Role
const User = require('../model/User')
const Role = require('../model/Role')

//class contains methods to requests processing
class Users{
    registration(req, res){
        try{
            const{login, password} = req.body
            const candidate = User.findOne(login)
            if (candidate){
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            return res.status(200).json({message: 'Пользователь создан'})
        }catch (e){
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }

    authorisation(req, res){
        try{

        }catch (e){
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new Users();