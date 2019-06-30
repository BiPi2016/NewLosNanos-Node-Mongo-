const express = require('express');
const router = express.Router();

const csurf = require('csurf');
const csurfProtection = csurf();

//router.use(csurfProtection);

const passport = require('passport');


const indexController = require('../controllers/indexController');

const userController = require('../controllers/userController');



/* Get Log out */
router.get('/logout', chkLoggedIn, userController.getLogOut);

/* GET users Profile Page. */
router.get('/profile', chkLoggedIn, userController.getUserProfile);

router.get('/cart', chkLoggedIn, userController.getCart);


/* Routes Available to all */
router.use('/', chkNotLoggedIn, (req, res, next) => {
    next();
});

/* GET home page. */
router.get('/', indexController.getHome);

/* Get Log in Page */
router.get('/login', userController.getLogIn);

/* Post Log in Page */
router.post('/login', userController.postLogIn);

/* Get Sign Up */
router.get('/signup', userController.getSignUp);

/* Post Sign Up */
router.post('/signup', userController.postSignUp);

// Get Add to cart
router.get('/addToCart', userController.postAddToCart);

function chkLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}
function chkNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

module.exports = router;
