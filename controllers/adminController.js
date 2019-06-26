const mongoose = require('mongoose');

const Product = require('../models/product');
const Size = require('../models/size');
const ProdType = require('../models//prodType');
const Category = require('../models/category');
const Audience = require('../models/gender');

const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Admin home page
exports.getAdminPage = (req, res, next) => {
    console.log('Admin Home Page');
    res.render('./adminViews/adminHome', {
        title: 'Admin Home',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Admin Get log in
exports.getAdminLogIn = (req, res, next) => {
    console.log('Getting admin sign in page');
    res.render('login', {
        title: 'Admin Login',
        topMenu: topCategory,
        footerMenu: footerMenu,
        adminUser: true
    });
}

// Admin Post log in
exports.postLogIn = (req, res, next) => {
    console.log(req.body);

    // If admin can be authenticated
    // redirect to admin homepage
    res.redirect('/');

    // else redirect to signin page
};

// Get Manage Users
exports.getManageUsers = (req, res, next) => {
    res.render('./adminViews/manageUsers', {
        title: 'Manage Users',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

// Get Manage Products
exports.getManageProducts = (req, res, next) => {
    res.render('./adminViews/manageProducts', {
        title: 'Manage Products',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

// Get All Products
exports.getProducts = (req, res, next) => {
    Product.find({})
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('./adminViews/products.ejs', {
            title: 'All Products',
            products: results
        });
    });
}

// Get Add Product
exports.getAddProduct = (req, res, next) => {
    console.log('add new product' + JSON.stringify(topCategory[0].subCats[0].name));
    
    res.render('./adminViews/addProduct', {
        title: 'Add Product',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};


// May be following was the better aproach, it needs to be elaborated however, have written just an idea
/* // Get Create Product
exports.getCreateProduct = (req, res, next) => {
    asynct.parallel({
        audiences: function(cb) {
            Audience.find({}).exec(cb);
        },
        categories: function(cb) {
            Category.find({}).exec(cb);
        },
        prodTypes: function(cb) {
            ProdType.find({}).exec(cb);
        }
    },
    (err, results) => {
        if(err)
            return next(err);
        res.render('./adminViews/createProduct', {
            audiences: results.audiences,
            categories: results.categories,
            prodType: results.prodTypes
        });
    });
} */

// Post Add Product
exports.postAddProduct = [
    //validate
    body('brand', 'Brand must not be empty').isLength({min:1}).trim(),
    body('name', 'Product-name must not be empty').isLength({min:1}).trim(),
    body('price', 'Price must be more than 0').isLength({min:1}).trim(),
    body('imageUrl').isLength({min:1}).withMessage('You must specify imageUrl').trim(),

    // sanitize
    sanitizeBody('brand').escape(),
    sanitizeBody('name').escape(),
    sanitizeBody('price').escape().toFloat(),
    sanitizeBody('imageUrl').escape(),
    
    function (req, res, next) {        
        console.log('inside request handerler');
        console.log('What user entered for sizes: ');
        console.log( req.body.chkSize);

        async.waterfall([
            function(cb) {
                Audience.find({name: req.body.audience})
                .exec( (err, result) => {
                    if(err) return next(err);
                    cb(null, result);
                });
            },
            function(selectedAud, cb) {
                Category.find({ $and: [{name: req.body.category}, {audience: selectedAud}] })
                .exec( (err, result) => {
                    if(err) return next(err);
                    cb(null, result);
                });
            },
            function(selectedCat, cb) {
                ProdType.findOne({$and: [{name: req.body.prodType}, {category: selectedCat} ]})
                .populate({
                    path: 'category',
                    populate: {
                        path: 'audience'
                    }
                })
                .exec( (err, result) => {
                    if(err) return next(err);
                    cb(null, result);
                });
            }], 
            function(err, selectedType) {
            if(err)
                return next(err);
                const imageUrlString = req.body.audience + '/' + req.body.category +'/'+ req.body.prodType +'/'+ req.body.imageUrl;
            // Create new instance of Product
            const product = new Product({
                brand: req.body.brand,
                name: req.body.name,
                price: req.body.price,
                audienceName: req.body.audience,
                audience: selectedType.category.audience._id,
                categoryName: req.body.category,
                category: selectedType.category._id,
                prodTypeName: req.body.prodType,
                prodType: selectedType._id,
                sizeNames: req.body.chkSize,
                imageUrl: imageUrlString
            });

            const errors = validationResult(req);

            console.log('Newely Created Product');
            console.log(product.sizeNames);

            if(!errors.isEmpty()) {
                console.log('Errors in input');
                return res.render('./adminViews/addProduct', {
                    title: 'Error in input',
                    topMenu: topCategory,
                    footerMenu: footerMenu,
                    product: product,
                    errors: errors.array()
                });
            }
            
            Product.findOne({ $and: [{name: req.body.name}, {brand: req.body.brand}, {prodType: selectedType._id}]})
            .exec( (err, result) => {
                // Product already registered
                if(result) {
                    console.log('Product already registered' + result);
                    return res.render('./adminViews/addProduct', {
                        title: 'Product already exist',
                        product: result,
                        topMenu: topCategory,
                        footerMenu: footerMenu,
                        errors: [new Error('Product already exists')]                        
                    });
                } else {
                    product.save( (err, savedProd) => {
                        if(err) return next(err);
                        console.log('Saved Product: ' + savedProd);
                        return res.redirect('/admin/products');
                    });
                }
            });
        });
    }
];

// Post Delete Product
exports.postDeleteProduct = (req, res, next) => {
    console.log('About to delete a product');
}
