const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
        useremail:{
            type : String,
            required: true,
        },
        useruid: {
            type: String,
            required: true,
        },
        order:{
            type: Object,
            required: true,
        },
        orderdate:{
            type: String,
            required:true
        },
        ordertime:{
            type: String,
            required:true
        }
});
module.exports = mongoose.model('allorders', OrderSchema)