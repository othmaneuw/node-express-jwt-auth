const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
})

const User = mongoose.model('user',userSchema);

module.exports = User;