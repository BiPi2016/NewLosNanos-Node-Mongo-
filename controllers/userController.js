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
exports.getLogin = (req, res, next) => {
    console.log('User Login page');
    res.render('userLogin', {
        title: 'User Login Page',
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