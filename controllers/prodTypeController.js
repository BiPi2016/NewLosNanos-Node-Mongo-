const mongoose = require('mongoose');

const ProdType = require('../models/prodType');
const Category = require('../models/category');
const Audience = require('../models/gender');


const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');
const helperFunc = require('../util/helperFunctions');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Get All Product Types
exports.getProdTypes = (req, res, next) => {
    ProdType.find({})
    .populate({
        path: 'category',
        populate: {
            path: 'audience'
        }
    })
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('./adminViews/prodTypes', {
            title: 'All Product-types',
            topMenu: topCategory,
            footerMenu: footerMenu,
            prodTypes: results
        });
    });
};

// Get Add Prodcut Type
exports.getAddProdType = (req, res, next) =>{
    Category.find({})
    .populate('audience')
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('./adminViews/addProdType', {
            title: 'Add new product type',
            topMenu: topCategory,
            footerMenu: footerMenu,
            categories: results
        }); 
    });    
}

// Post Add ProdType
exports.postAddProdType = [
    // Validate
    body('prodType').isLength({min: 2}).withMessage('Type of product can not be less than two characters long'),

    // Sanitize
    sanitizeBody('prodType').escape(),

    // Handle the post request
    function(req, res, next) {
        const prodType = new ProdType( {
            name: req.body.prodType.toLowerCase(),
            category: mongoose.Types.ObjectId(req.body.category) // req.body.category
        });
        console.log(prodType);

        async.parallel({
            audiences: function(cb) {
                Audience.find({}).exec(cb);
            },
            categories: function(cb) {
                Category.find({}).populate('audience').exec(cb);
            },
            prodTypes: function(cb) {
                ProdType.findOne({name: prodType.name})
                .populate({
                    path: 'category',
                    populate: {
                        path: 'audience'
                    }
                })
                .where('category').equals(prodType.category)
                .exec(cb);
            }
        },
        function(err, results) {
            if(err)
                return next(err);

            // Invalid input entered
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.render('./adminViews/addProdType', {
                    title: 'Invalid input',
                    prodType: prodType,
                    categories: results.categories,
                    audiences: results.audiences,
                    errors: errors.array()
                });
            }

            // Product type already exists
            if(results.prodTypes) {
                return res.render('./adminViews/addProdType', {
                    title: 'Product type already exists',
                    prodType: prodType,
                    categories: results.categories,
                    errors: [new Error('Product type already exists')]
                });
            }

            // Valid input entered, a new product type will be saved
            prodType.save((err, result) => {
                if(err)
                    return next(err);
                res.redirect('/admin/addProdType');
            });
        })
    }

];