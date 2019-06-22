const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const categoryController = require('../controllers/categoryController');
const prodTypeController =  require('../controllers/prodTypeController');
const sizeController = require('../controllers/sizeController');
const genderController = require('../controllers/genderController');



// Get Admin login
router.get('/login', adminController.getAdminLogIn);

//  Post Admin login
router.post('/login', adminController.postLogIn);

// Get Admin Homepage
router.get('/', adminController.getAdminPage);

// Get Manage users
router.get('/manageUsers', adminController.getManageUsers);

// Get Manage Products
router.get('/manageProducts', adminController.getManageProducts);

//Get All Products
router.get('/products', adminController.getProducts);

// Get Add Product
router.get('/addProduct', adminController.getAddProduct);

// Post Add Product
router.post('/addProduct', adminController.postAddProduct);

//Get Target audience
router.get('/audiences', genderController.getAudiences);



// Get All Categories
router.get('/prodCategories', categoryController.getCategories);
// Get Add Category
router.get('/addCategory', categoryController.getAddCategory);
// Post Add Category
router.post('/addCategory', categoryController.postAddCategory);


// Get All Product Types
router.get('/prodTypes', prodTypeController.getProdTypes);
// Get Add Type
router.get('/addProdType', prodTypeController.getAddProdType);
// Post Add Type
router.post('/addProdType', prodTypeController.postAddProdType);

// Get sizes
router.get('/prodSizes', sizeController.getSizes);
// Get Add Size
router.get('/addSize', sizeController.getAddSize);
// Post Add size
router.post('/addSize', sizeController.postAddSize);

module.exports = router;