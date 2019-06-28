var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users Profile Page. */
router.get('/', userController.getUserProfile);

router.get('/cart', userController.getCart);


module.exports = router;
