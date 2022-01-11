//include module
const {Schema, model} = require('mongoose');

//create schema
const User = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: [{type: String, ref:'Role'}]
});

//export model
module.exports = model('User', User);