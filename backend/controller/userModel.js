const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    serial_number:{
        type: String,
        required: true
    },
    validation_key:{
        type: String,
        required: true
    },
    buying_date:{
        type: Date,
    },
    Activacted:{
        type:Number
    }
})

module.exports = mongoose.model('users', userSchema)