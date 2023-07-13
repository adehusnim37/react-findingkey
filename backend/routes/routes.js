const express = require("express")
const userController =  require('../controller/UserController');

const router = express.Router()

router.route('/user/register').post(userController.addUser)
router.route('/userAll').get(userController.getAllUsers)
router.route('/user/:name').get(userController.findOneUser)
router.route('/activate/:serial_number/:validation_key').get(userController.findKey)
router.route('/buy/vkey/:serial_number').get(userController.BuyVkey)
router.route('/user/free/:validation_key').get(userController.freeVkey)

module.exports = router