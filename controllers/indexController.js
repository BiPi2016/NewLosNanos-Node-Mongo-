const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');

const passport = require('passport');

const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');



const csurf = require('csurf');
const csurfProtection = csurf();

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Get Landing Page
exports.getHome = (req, res, next) => {
    console.log('Homepage');
    console.log('session is ' + req.session.id);
    res.render('index', { 
        title: 'Express', 
        topMenu: topCategory,
        footerMenu: footerMenu,
        carousellImgs: resources.carousellImgUrls,
        featuredProducts: resources.featuredProducts
     });
};

// Get Category
exports.getProducts = (req, res, next) => {
    // Check if there is a query

    // Paginate before displaying

    // If no query is conducted display products

    Product.find({})
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('categories', {
            title: 'LosNanos Products',
            topMenu: topCategory,
            footerMenu: footerMenu,
            productList: results
        });
    });    
};

// Get Product Details
exports.getProductDetails = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    Product.findOne({_id: id})
    .exec( (err, desiredProd) => {
        if(err) next(err);

        // Could not find the product
        if(!desiredProd) {
            return res.render('productDetails', {
                title: 'Errors 404',
                topMenu: topCategory,
                footerMenu: footerMenu,
                errors: [new Error('Could not find the product')]
            });
        }

        res.render('productDetails', {
            title: desiredProd.name,
            topMenu: topCategory,
            footerMenu: footerMenu,
            product: desiredProd
        });
    });
}

// Get Contact Us
exports.getContactUs = (req, res, next) => {
    res.render('contactus', {
        title: 'Contact Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};
