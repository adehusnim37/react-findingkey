const mongoose = require("mongoose")
const schema = mongoose.Schema

const productsSchema = new schema({
    nameProduct:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    dateCreate:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('products', productsSchema)