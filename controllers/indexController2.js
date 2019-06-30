const mongoose = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');
const Session = require('../models/session');

const topCategory = require('../util/menu');
const footerMenu = require('../util/footer');
const resources = require('../util/resourceLocator');


const csurf = require('csurf');
const csurfProtection = csurf();

const async = require('async');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// Get Landing Page
exports.getHome = (req, res, next) => {
    console.log('Homepage');
    console.log('session is ' + req.session.id);
    res.render('index', { 
        title: 'Express', 
        topMenu: topCategory,
        footerMenu: footerMenu,
        carousellImgs: resources.carousellImgUrls,
        featuredProducts: resources.featuredProducts
     });
};


// Get Login
exports.getLogIn = (req, res, next) => {
    console.log('User Login page');
    res.render('login', {
        title: 'User Login Page',
        topMenu: topCategory,
        footerMenu: footerMenu,
        adminUser: false/* ,
        csrfToken: req.csrfToken() */
    });
};

// Post login
exports.postLogIn = [
    // Validate the email
    body('userName', "Username must be a valid email").isEmail().trim(),

    // Sanitize
    sanitizeBody('*').escape(),

    // Handle the request
    (req, res, next) => {
    User.findOne({userName: req.body.userName})
    .exec( (err, result) => {
        if(err) return next(err);

        // User not found
        if(!result) {
            return res.status(401).render('login', {
                title: 'User not found',
                topMenu: topCategory,
                footerMenu: footerMenu,
                adminUser: false,
                notAuthenticated: true
            });
        }
        
        // Password not matched
        let rightPassword = result.passwordMatches(req.body.password);
        console.log('correct password entered ' + rightPassword);
        if(!rightPassword) {
            return res.status(401).render('login', {
                title: 'User not found',
                topMenu: topCategory,
                footerMenu: footerMenu,
                adminUser: false,
                notAuthenticated: true
            });
        }

        console.log('User found ' + result._id);
        console.log(req.cookies['connect.sid']);
        console.log('Session id is ' + (req.session.id));
        
        // Set the session for logged in user

        req.session.validated = true;
        req.session.userId = result._id;

        console.log(req.session);
        
        res.redirect('/');
        
    });    
}];

// Get Sign up
exports.getSignUp = (req, res, next) => {
    console.log('Getting sign-up form');
    res.render('signup', {
        title: 'Register with Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};

// Post Sign up
exports.postSignUp = [
    // Validate
    body('userEmail', 'Username should be a valid email').isEmail(),    
    body('confirmEmail', 'Confirmation email should be a valid email').isEmail(),
    body('password', 'Password must be minimum 8 characters long').isLength({min: 8}).trim(),    
    body('repeatPass', 'Password(repeated) must be minimum 8 characters long').isLength({min: 8}).trim(),

    // Sanitize
    sanitizeBody('userEmail').escape(),
    sanitizeBody('confirmMail').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('repeatPass').escape(),

    // Handle request
    (req, res, next) => {
        console.log('Posting sign-up data');

        const errors = validationResult(req);

        // Check if emails and passwords match
        const email = req.body.userEmail;
        const confEmail = req.body.confirmEmail;
        const pass = req.body.password;
        const repPass = req.body.repeatPass;

        
        // Errors in input
        if(!errors.isEmpty()) {
            console.log(JSON.stringify(errors.array()));
            return res.render('signup', {
                title: 'Errors in input',
                topMenu: topCategory,
                footerMenu: footerMenu,
                errors: errors.array(),
                userEmail: email,
                confirmEmail: confEmail,
                password: pass,
                repeatPass: repPass
            });
        }

        const missMatchErrors = [];  // Not actually used

        const passMatch = pass === repPass;
        console.log('Password match ' + passMatch);

        const emailsMatch = email === confEmail;
        console.log('Emails match ' + emailsMatch);

        // Emails and password unmatch
        if(!passMatch || !emailsMatch) {
            console.log('Emails or passwords do not match');
            return res.render('signup', {
                title: 'Emails/Passwords do not match',
                topMenu: topCategory,
                footerMenu: footerMenu,
                userEmail: email,
                confirmEmail: confEmail,
                password: pass,
                repeatPass: repPass,
                doesEmailsMatch: emailsMatch ? 'matched' : 'notMatched',
                doesPassMatch: passMatch  ? 'matched' : 'notMatched',
                missMatchErrors: missMatchErrors
            });
        }

        // All clear, Check if the user previously exist
        User.findOne({userName: email})
        .exec( (err, result) => {
            if(err) return next(err);
            if(result) {
                // user previously exits
                return res.render('signup', {
                    title: 'User previously exist',
                    topMenu: topCategory,
                    footerMenu: footerMenu,
                    userEmail: email,
                    confirmEmail: confEmail,
                    password: pass,
                    repeatPass: repPass,
                    alreadyExists: true
                });
            }
            
            // New User Instance
            const user = new User( {
                userName: email,
                password: pass
            });

            user.save( (err, savedUser) => {
                if(err) return next(err);

                console.log('New user created' + savedUser);

                res.render('login', {
                    title: 'New account created', 
                    topMenu: topCategory,
                    footerMenu: footerMenu,
                    adminUser: false,
                    newUserCreated: true
                });
            });
        });
    }
];


// Get Category
exports.getProducts = (req, res, next) => {
    // Check if there is a query

    // Paginate before displaying

    // If no query is conducted display products

    Product.find({})
    .exec( (err, results) => {
        if(err)
            return next(err);
        res.render('categories', {
            title: 'LosNanos Products',
            topMenu: topCategory,
            footerMenu: footerMenu,
            productList: results
        });
    });    
};


// Get Product Details
exports.getProductDetails = (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    Product.findOne({_id: id})
    .exec( (err, desiredProd) => {
        if(err) next(err);

        // Could not find the product
        if(!desiredProd) {
            return res.render('productDetails', {
                title: 'Errors 404',
                topMenu: topCategory,
                footerMenu: footerMenu,
                errors: [new Error('Could not find the product')]
            });
        }

        res.render('productDetails', {
            title: desiredProd.name,
            topMenu: topCategory,
            footerMenu: footerMenu,
            product: desiredProd
        });
    });
}

// Get Contact Us
exports.getContactUs = (req, res, next) => {
    res.render('contactus', {
        title: 'Contact Los Nanos',
        topMenu: topCategory,
        footerMenu: footerMenu
    });
};
