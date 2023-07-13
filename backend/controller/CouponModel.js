const mongoose = require('mongoose');
const schema = mongoose.Schema
// Define the schema for the Coupon model
const couponSchema = new schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discountAmount: {
        type: Number,
        required: true,
    },
    availability: {
        type: Number,
        required: true
    },
    date_create: {
        type: Date,
        required: true
    },
    date_expiry:{
        type: Date,
        required: true
    }
});

// Create the Coupon model from the schema
module.exports = mongoose.model('Coupon', couponSchema)
