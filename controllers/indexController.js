const mongoose = require('mongoose');
const Product = require('../models/product');

const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.getHome = (req, res, next) => {
    console.log('Homepage');
    res.render('index', { 
        title: 'Express', 
        topMenu: topCategory,
        footerMenu: footerMenu,
        carousellImgs: resources.carousellImgUrls,
        featuredProducts: resources.featuredProducts
     });
};

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

exports.getContactUs = (req, res, next) => {
    res.render('contactus', {
        title: 'Contact Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};
