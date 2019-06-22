const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');
const helperFunc = require('../util/helperFunctions');

const ProdType = require('../models/prodType');
const Category = require('../models/category');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Get All Product Types
exports.getProdTypes = (req, res, next) => {
    ProdType.find({})
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
    res.render('./adminViews/addProdType', {
        title: 'Add new product type',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

// Post Add ProdType
exports.postAddProdType = (req, res, next) =>{
    
}