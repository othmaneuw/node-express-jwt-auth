const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

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

userSchema.pre('save',function(next){
    console.log("User is about to get saved",this);
    next();
})

const User = mongoose.model('user',userSchema);

module.exports = User;