const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// Get Admin login
router.get('/login', adminController.getAdminLogIn);

//  Post Admin login
router.post('/login', adminController.postLogIn);

// Get Admin Homepage
router.get('/', adminController.getAdminPage);

// Get Manage Products
router.get('/manageProducts', adminController.getManageProducts);

// Get Add Product
router.get('/addProduct', adminController.getAddProduct);

// Post Add Product
router.post('/addProduct', adminController.postAddProduct);


module.exports = router;