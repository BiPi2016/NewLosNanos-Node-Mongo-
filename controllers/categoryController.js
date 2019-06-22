const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');
const helperFunc = require('../util/helperFunctions');

const Category = require('../models/category');

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
    res.render('./adminViews/addCategory', {
        title: 'Add New Category',
        topMenu: topCategory,
        footerMenu: footerMenu
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

        // Check if category already exists
        Category.find({name: req.body.category})
        .exec( (err, result) => {
            if(err)
                return next(err);
            // Category already exists
            if(result !== null) {
                return res.render('./adminViews/addCategory', {
                    title: 'Add New Category',
                    topMenu: topCategory,
                    footerMenu: footerMenu,
                    category: req.body,
                    errors: [new Error('Category Already Exists!!')]
                });
            }

            // Create a new category
            const category = new Category({ name: req.body.category});
            category.save( (err, result) => {
                if(err)
                    return next(err);
                res.redirect('/admin/prodCategories');
            });
        });
    }
];