const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById({_id: id}, (err, user) => {
        done(err, user);
    });
});

// Local sign up
passport.use('local.signup', new LocalStrategy({
        usernameField: 'userEmail',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, userName, password, done) => {
        body('password', 'Password must be at leas 8 characters long').exists().isLength({min: 8}).trim();
        body('userEmail', 'Invalid Email').isEmail().trim();
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorMsgs = [];
            errors.array().forEach( err => {
                errorMsgs.push(err.msg);
            });
            return done(null, false, req.flash('error', errorMsgs));
        }
        User.findOne({userName: userName}, (err, user) => {
            if(err) return done(err);
            if(user) return done(null, false, {message: "This email is already in use"});
            const newUser = new User({
                userName: userName,
                password: password
            });
            newUser.save( (err, result) => {
                if(err) return done(err);
                return done(null, result);
            });
        });
    }));

// Local sign in
passport.use('local.signin', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    body('userName', 'Username is your registered email').isEmail().trim();
    const valErrs = validationResult(req);
    if(!valErrs.isEmpty()) {
        const errorMsgs = [];
        errors.array().forEach( err => {
            errorMsgs.push(err.msg);
        });
        return done(null, false, req.flash('error', errorMsgs)); 
    }

    User.findOne({userName: username}, (err, theUser) => {
        if(err) return done(err);
        // User not found
        if(!theUser) return done(null, false, {"message": 'Wrong email and/or password'});
        // Password does not match
        if(!theUser.passwordMatches(password))  return done(null, false, {"message": 'Wrong email and/or password'});
        return done(null, theUser);
    });
}));