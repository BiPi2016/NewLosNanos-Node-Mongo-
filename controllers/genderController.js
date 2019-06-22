const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');
const chalk =  require('chalk');
const helperFunc = require('../util/helperFunctions');

const Gender = require('../models/gender');
const ProdType = require('../models/prodType');
const Category = require('../models/category');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

//Get all genders
exports.getAudiences = (req, res, next) => {
    console.log(chalk('Getting all genders'));
    console.log('inside gender locator')
    Gender.find({})
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('./adminViews/audiences', {
            title: 'All Audience',
            topMenu: topCategory,
            footerMenu: footerMenu,
            audiences: results
        });
    });
};
