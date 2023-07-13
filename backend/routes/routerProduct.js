const express = require("express")
const ProductController = require("../controller/ProductController")


const routerProduct = express.Router()

routerProduct.route('/add').post(ProductController.addProducts)
routerProduct.route('/').get(ProductController.getAllProducts)

module.exports = routerProduct