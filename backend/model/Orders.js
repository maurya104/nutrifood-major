const { default: mongoose, Schema } = require("mongoose");

// const mongoose = require(mongoose)
const { schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    }
    
});

module.exports = mongoose.model('order', OrderSchema)