const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');
const user = require('../models/user');
const bed = require('../models/bed');
const bookg = require('../models/bookg');



// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {


        user: req.user
    })
);


router.get("/auth/google",
    passport.authenticate('google', {
        scope: ["email", " profile"]
    })
);

router.get("/auth/google/middle",
    passport.authenticate('google', {
        failureRedirect: "/login"
    }),
    function(req, res) {
        nbed = new bed({
            critLevel: "High",
            pincode: 411040,
            hospital: true,
            tslot: true
        });
        nbed.save();
        // Successful authentication, redirect to secrets.
        res.redirect("/dashboard");
    });


// exporting module for app.js
module.exports = router
