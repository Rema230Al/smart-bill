const mongoose = require('mongoose');
const userSchemas = new mongoose.Schema({

 name:{
    type: String ,
    required: true
 },

 email:{
    required:true,
    type:String,
    unique: true
 },
 password:{
    type:String,
    required:true
 }

});

module.exports= mongoose.model('User', userSchemas);