const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

const Size = require('../models/size');
const ProdType = require('../models/prodType');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');


// Get all sizes
exports.getSizes = (req, res, next) => {
    Size.find({})
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
    res.render('./adminViews/addSize', {
        title: 'Add new size',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

// Post Add Size
exports.postAddSize = (req, res, next) =>{
    
}
