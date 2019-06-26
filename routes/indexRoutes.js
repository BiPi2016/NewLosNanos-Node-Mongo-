const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.getHome);

/* Get all products */
router.get('/products', indexController.getProducts);

/* Get Products Details */
router.get('/product/:id', indexController.getProductDetails);

/* Get Contact Us */
router.get('/contactus',indexController.getContactUs);
module.exports = router;
