//include module
const {Schema, model} = require('mongoose');

//create schema
const Role = new Schema({
    value: {type: String, unique: true, default: 'USER'},

});

//export model
module.exports = model('Role', Role);