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

// Get Manage Users
exports.getManageUsers = (req, res, next) => {
    res.render('./adminViews/manageUsers', {
        title: 'Manage Users',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

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
    console.log('add new product' + JSON.stringify(topCategory[0].subCats[0].name));
    
    res.render('./adminViews/addProduct', {
        title: 'Add Product',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Post Add Product
exports.postAddProduct = (req, res, next) => {
    console.log('New Product');
    console.log(req.body);

    res.send(req.body);
    //validate

    // sanitize

    // if errors redirect to /admin/addProduct with populated data
    // if validated successfully save, display alert and redirect to empty /admin/addProduct
}

// Post Delete Product
exports.postDeleteProduct = (req, res, next) => {
    console.log('About to delete a product');
}

// Get Add Category
exports.getAddCategory = (req, res, next) =>{
    res.render('./adminViews/addCategory', {
        title: 'Add New Category',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

// Post Add Category
exports.postAddCategory = (req, res, next) =>{
    
}

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
// Get Add Size
exports.getAddSize = (req, res, next) =>{
    res.render('./adminViews/addSize', {
        title: 'Add new size',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
}

// Post Add Size
exports.postAddSize = (req, res, next) =>{
    
}

