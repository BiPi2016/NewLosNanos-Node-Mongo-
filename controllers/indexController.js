const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

const products = [
    {
        brand: 'Duke',
        name: 'Kunvar KurtaKunvar KurtaKunvar KurtaKunvar KurtaKunvar KurtaKunvar Kurta',
        imageUrl: 'kurta.jpg',
        type: 'shirts',
        category: 'Ethnic',
        gender: 'boys',
        price: 20,
        sizes: ['s', 'm', 'l', 'xl']
    }, {}, {}, {}, {}, {}, {}
]

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
    res.render('categories', {
        title: 'LosNanos Products',
        topMenu: topCategory,
        footerMenu: footerMenu,
        productList: products
    });
};

exports.getContactUs = (req, res, next) => {
    res.render('contactus', {
        title: 'Contact Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};
