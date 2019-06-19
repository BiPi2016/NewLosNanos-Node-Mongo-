const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

exports.getHome = (req, res, next) => {
    console.log('Homepage');
    res.render('index', { 
        title: 'Express', 
        topMenu: topCategory,
        footerMenu: footerMenu,
        carousellImgs: resources.carousellImgUrls,
        featuredProducts: resources.featuredProducts
     });
};

exports.getProducts = (req, res, next) => {
    console.log('Product page to be rendered');
    res.render('products', {
        title: 'LosNanos Products',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

exports.getContactUs = (req, res, next) => {
    res.render('contactus', {
        title: 'Contact Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};
