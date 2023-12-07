const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
        email:{
            type : String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
        order:{
            type: Object,
            required: true,
        }
});
module.exports = mongoose.model('allusers', UserSchema)