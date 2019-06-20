const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');

// Admin home page
exports.getAdminPage = (req, res, next) => {
    console.log('Admin Home Page');
    res.render('./adminViews/adminHome', {
        title: 'Admin Home',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Admin Get log in
exports.getAdminLogIn = (req, res, next) => {
    console.log('Getting admin sign in page');
    res.render('login', {
        title: 'Admin Login',
        topMenu: topCategory,
        footerMenu: footerMenu,
        adminUser: true
    });
}

// Admin Post log in
exports.postLogIn = (req, res, next) => {
    console.log(req.body);

    // If admin can be authenticated
    // redirect to admin homepage
    res.redirect('/');

    // else redirect to signin page
};

// Get Manage Products
exports.getManageProducts = (req, res, next) => {
    res.render('./adminViews/manageProducts', {
        title: 'Manage Products',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

// Get Add Product
exports.getAddProduct = (req, res, next) => {
    console.log('add new product');
    res.render('./adminViews/addProduct', {
        title: 'Add Product',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Post Add Product
exports.postAddProduct = (req, res, next) => {
    console.log('New Product');
    console.log('req.body');
    //validate

    // sanitize

    // if errors redirect to /admin/addProduct with populated data
    // if validated successfully save, display alert and redirect to empty /admin/addProduct
}

// Post Delete Product
exports.postDeleteProduct = (req, res, next) => {
    console.log('About to delete a product');
}