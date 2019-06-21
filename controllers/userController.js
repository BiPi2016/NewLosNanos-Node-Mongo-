const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

// Get UserProfile
exports.getUserProfile = (req, res, next) => {
    console.log('User Profile page');
    res.render('userProfile', {
        title: 'User Page',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Get Login
exports.getLogIn = (req, res, next) => {
    console.log('User Login page');
    res.render('login', {
        title: 'User Login Page',
        topMenu: topCategory,
        footerMenu: footerMenu,
        adminUser: false
    });
};

// Post login
exports.postLogIn = (req, res, next) => {
    console.log('Posting the user-log-in request');
    res.send('Post log in page');
};

// Get Sign up
exports.getSignUp = (req, res, next) => {
    console.log('Geting sign-up form');
    res.send('Sign-up page');
};

// Post Sign up
exports.postSignUp = (req, res, next) => {
    console.log('Posting sign-up data');
    res.send('req.body');
}

// Get Cart
exports.getCart = (req, res, next) => {
    console.log('Cart');
    res.render('cart', {
        title: 'Cart',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};