const Size = require('../models/size');
const ProdType = require('../models/prodType');

const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');
const helperFunc = require('../util/helperFunctions');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');


// Get all sizes
exports.getSizes = (req, res, next) => {
    Size.find({})
    .populate({
        path: 'prodType',
        populate: {
            path: 'category',
            populate: {
                path: 'audience'
            }
        }
    })
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('./adminViews/prodSizes', {
            title: 'All Product-sizes',
            topMenu: topCategory,
            footerMenu: footerMenu,
            prodSizes: results
        });
    });
};

// Get Add Size
exports.getAddSize = (req, res, next) => {
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
        res.render('./adminViews/addSize', {
            title: 'Add new size',
            topMenu: topCategory,
            footerMenu: footerMenu,
            prodTypes: results
        });
    });    
}

// Post Add Size
exports.postAddSize = [
    // Convert sizes to array
    (req, res, next) => {
        if(!(req.body.sizes instanceof Array)) {
            if(typeof req.body.sizes === 'undefined')
                req.body.sizes = [];
            else
                req.body.sizes = new Array(req.body.sizes);
        }
        next();
    },

    // Validate
    body('prodType').isAlphanumeric().withMessage('Can only be a comma-separated list of alphanumerics'),

    // Sanitaize
    sanitizeBody('prodType').escape(),

    // Process the request
    function(req, res, next) {
        async.parallel({
            prodTypes: function(cb) {
                ProdType.find()
                .populate({
                    path: 'category',
                    populate: {
                        path: 'audience'
                    }
                })
                .exec(cb);
            },
            sizes: function(cb) {
                Size.findOne({prodType: req.body.prodType}).exec(cb);
            }
        }, function(err, results) {
            if(err)
                return next(err);

            const errors = validationResult(req);

            //Errors in input
            if(!errors.isEmpty()) {
                helperFunc.yLog('Errors in input user entered');
                return res.render('./adminViews/addSize', {
                    title: 'Errors in input',
                    errors: errors.array(),
                    prodTypes: results.prodTypes,
                    sizes: req.body.sizes
                });
            }

            // Sizes for selected product-type already defined
            if(results.sizes) {
                helperFunc.yLog('Sizes for this product already exist');
                return res.render('./adminViews/addSize', {
                    title: 'Sizes for selected product-type already defined',
                    prodTypes: results.prodTypes,
                    errors: [new Error('Sizes for selected product-type already defined')],
                    sizes: req.body.sizes
                });
            }

            // A new valid set of sizes provided, proceed to save
            // create the new sizes instance
            //const sizeArray = req.body.sizes.split(',');
            const sizes = new Size( {
                //sizeNames: sizeArray,
                sizeNames: req.body.sizes,
                prodType: req.body.prodType
            });
            sizes.save( (err, result) => {
                if(err)
                    return next(err);
                console.log('Save results are ')
                console.log(result);
                res.redirect('/admin/prodSizes');
            });
        });        
    }
];
