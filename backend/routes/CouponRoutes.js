const express = require('express');
const CouponController = require('../controller/CouponController');

const routerCoupon = express.Router();

routerCoupon.route('/add').post(CouponController.createCoupon);
routerCoupon.route('/apply/:code').get(CouponController.validateCoupon);

module.exports = routerCoupon;
