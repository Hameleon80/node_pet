//include module
const {Schema, model} = require('mongoose');

//create schema
const Role = new Schema({
    login: {type: String, unique: true, default: 'User'},

});

//export model
module.exports = model('Role', Role);