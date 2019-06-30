const mongoose = require('mongoose');
const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

const User = require('../models/user');

const passport = require('passport');

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

// Post to Cart
exports.postAddToCart = (req, res, next) => {
    console.log(req.body);
}

// Get Login
exports.getLogIn = (req, res, next) => {
    console.log('User Login page');
        
    const msg = req.flash('error');

    res.render('login', {
        title: 'User Login Page',
        topMenu: topCategory,
        footerMenu: footerMenu,
        adminUser: false,
        errorMsg: msg
    });
};

// Post login
exports.postLogIn = passport.authenticate('local.signin', {
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: true
});

// Get LogOut
exports.getLogOut = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
// Get Sign up
exports.getSignUp = (req, res, next) => {
    console.log('Getting sign-up form');
    const msg = req.flash('error');
    res.render('signup', {
        title: 'Register with Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu,
        errorMsg: msg
    });
};

// Post Sign up
exports.postSignUp = passport.authenticate('local.signup', {
    successRedirect: '/users/login',
    failureRedirect: '/users/signup',
    failureFlash: true
});



