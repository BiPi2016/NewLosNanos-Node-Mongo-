const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');
const helperFunc = require('../util/helperFunctions');

const Category = require('../models/category');
const Gender = require('../models/gender');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');


// Get All Categories
exports.getCategories = (req, res, next) => {
    Category.find({})
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
    body('category').isLength({min:2}).trim().withMessage("Category name must be more than 2 characters long"),

    // Sanitize
    sanitizeBody('category').escape(),

    function(req, res, next) {
        // Process the request
        const errors = validationResult(req);

        // If errors in input
        if(!errors.isEmpty()) {
            res.render('./adminViews/addCategory', {
                title: 'Add New Category',
                topMenu: topCategory,
                footerMenu: footerMenu,
                category: req.body,
                errors: errors.array()
            });
        }

        // Create a new category
        const category = new Category({ name: req.body.category});

        // Check if category already exists
        Category.find({name: req.body.category})
        .exec( (err, result) => {
            helperFunc.yLog('Data entered');
            if(err)
                return next(err);
            // Category already exists
            if(result !== null) {
                helperFunc.yLog('Data exists previously');
                return res.render('./adminViews/addCategory', {
                    title: 'Add New Category',
                    topMenu: topCategory,
                    footerMenu: footerMenu,
                    category: category,
                    errors: [new Error('Category Already Exists!!')]
                });
            }

            category.save( (err, result) => {
                if(err)
                    return next(err);
                res.redirect('/admin/prodCategories');
            });
        });
    }
];