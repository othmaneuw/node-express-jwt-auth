const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email : {
        type : String,
        required : [true, 'email required'],
        lowercase : true,
        unique : true,
        validate : [ isEmail , 'Please enter a valide email' ]
    },
    password : {
        type : String,
        required : [true,'password required'],
        minlength : [6 , 'Minimum length is 6']
    }
})

userSchema.post('save',function(doc,next){
    console.log("User saved",doc);
    next();
})
    
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

const User = mongoose.model('user',userSchema);

module.exports = User;