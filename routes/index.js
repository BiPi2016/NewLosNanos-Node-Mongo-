const express = require('express');
const router = express.Router();
const indexRouter = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexRouter.getHome);

/* Get all products */
router.get('/products', indexRouter.getProducts);

/* Get Products Details */

module.exports = router;
