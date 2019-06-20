var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users Profile Page. */
router.get('/', userController.getUserProfile);

/* Get Log in Page */
router.get('/login', userController.getLogin);

router.get('/cart', userController.getCart);


module.exports = router;
