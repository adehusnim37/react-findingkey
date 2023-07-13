const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require("cors")
const routes = require("./routes/routes")
const routerProduct = require("./routes/routerProduct")
const routerCoupon = require("./routes/CouponRoutes")
require('dotenv').config()

const app = express()
const port = process.env.PORT
const connectionString = process.env.MONGO_URI

app.use(cors())
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

mongoose.set("strict",true)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDatabase');
        // Perform additional operations
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

app.use('/',routes)
app.use('/product',routerProduct)
app.use('/coupon', routerCoupon)


app.listen(port || 4000, () => {
    console.log(`selamat anda telah masuk kedalam server ${port}`)
})