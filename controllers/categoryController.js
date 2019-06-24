const Category = require('../models/category');
const Gender = require('../models/gender');

const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');
const helperFunc = require('../util/helperFunctions');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');


// Get All Categories
exports.getCategories = (req, res, next) => {
    Category.find({})
    .populate('audience')
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('./adminViews/prodCategories', {
            title: 'All Product Categories',
            topMenu: topCategory,
            footerMenu: footerMenu,
            categories: results
        });
    });
};

// Get Add Category
exports.getAddCategory = (req, res, next) =>{
    helperFunc.log('Get add category');
    Gender.find({})
    .exec( (err, results) => {
        if(err)
            next(err);
        res.render('./adminViews/addCategory', {
            title: 'Add New Category',
            topMenu: topCategory,
            footerMenu: footerMenu,
            audiences: results
        });
    });
}

// Post Add Category
exports.postAddCategory = [
    // Validating input
    body('categoryName').isLength({min:2}).trim().withMessage("Category name must be more than 2 characters long"),

    // Sanitize
    sanitizeBody('categoryName').escape(),

    function(req, res, next) {
        async.parallel( {
            audiences: function(cb) {
                Gender.find({}).exec(cb);
            },
            categories: function(cb) {
                Category.find({name: req.body.categoryName})
                .where('audience').equals(req.body.audience)
                .exec(cb);
            }
        },
        function(err, results) {
            if(err)
                return next(err);

            //what does query fetch??'
            console.log('Presave checks:')
            console.log(results.categories);

            // Process the request
            const errors = validationResult(req);   
            
            const category = new Category({ 
                audience: req.body.audience,
                name: req.body.categoryName.toLowerCase()
            });

            helperFunc.yLog('This is the new category');
            helperFunc.yLog(category);

            // If errors in input
            if(!errors.isEmpty()) {
                return res.render('./adminViews/addCategory', {
                    title: 'Add New Category',
                    topMenu: topCategory,
                    footerMenu: footerMenu,
                    category: category,
                    errors: errors.array()
                });
            }

            // Category already exists
            if(results.categories.length > 0) {
                helperFunc.yLog('Data exists previously');
                
                helperFunc.yLog(category);

                return res.render('./adminViews/addCategory', {
                    title: 'Add New Category',
                    topMenu: topCategory,
                    footerMenu: footerMenu,
                    category: category,
                    audiences: results.audiences,
                    errors: [new Error('Category Already Exists!!')]
                });
            }

            category.save( (err, savedCat) => {
                if(err)
                    return next(err);
                console.log('Result of save method: ');
                console.log(savedCat);
                res.redirect('/admin/prodCategories');
            });            
        });
    }
];