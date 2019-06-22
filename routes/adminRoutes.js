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

// Get Add Product
router.get('/addCategory', adminController.getAddCategory);

// Post Add Product
router.post('/addCategory', adminController.postAddCategory);

// Get Add Product
router.get('/addProdType', adminController.getAddProdType);

// Post Add Product
router.post('/addProdType', adminController.postAddProdType);
// Get Add Product
router.get('/addSize', adminController.getAddSize);

// Post Add Product
router.post('/addSize', adminController.postAddSize);


module.exports = router;