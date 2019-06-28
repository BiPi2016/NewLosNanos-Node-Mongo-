const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Get UserProfile
exports.getUserProfile = (req, res, next) => {
    console.log('User Profile page');
    res.render('userProfile', {
        title: 'User Page',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Get Cart
exports.getCart = (req, res, next) => {
    console.log('Cart');
    res.render('cart', {
        title: 'Cart',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};