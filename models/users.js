const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
        email:{
            type : String,
            required: true,
        },
        password:{
            type: String,
            required:true
        },
        addressadded:{
            type: Boolean,
            required: false,
            default: false
        },
        address:{
            type: String,
            required: false,
        }

});
module.exports = mongoose.model('allusers', UserSchema)