const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

const {
    forwardAuthenticated
} = require('../config/auth');
const {
    ensureAuthenticated
} = require('../config/auth');

const path = require('path');
const bed = require('../models/bed');
const bookg = require('../models/bookg');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));









router.get("/auth/google",
    passport.authenticate('google', {
        scope: ["profile"]
    })
);



// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

router.get('/search', ensureAuthenticated, (req, res) => {
    res.render('search', {
        user: req.user
    })

});

router.get('/scritLevel', ensureAuthenticated, (req, res) => {
    res.render('scritLevel', {
        user: req.user
    })

});

router.get('/showbooking', ensureAuthenticated, (req, res) => {
    const user = req.user.email;
    bookg.find({
        user: user
    }, (err, bookg) => {

        // console.log(bookg)
        res.render('showbookg', {
            bookglists: bookg
        })
    });
})

router.post('/scritLevel', ensureAuthenticated, (req, res) => {
    const critLevel = req.body.critLevel;

    console.log(req.user.email);
    bed.find({
        critLevel: critLevel,
        status: false
    }, (err, results) => {
        if (err) {
            console.log(err)
        } else {

            res.render('beddis', {
                results: results,
                user: req.user
            })

        }
    });



});

router.post('/bookbed', ensureAuthenticated, async (req, res) => {
    const bedid1 = req.body.bedid;
    const user = req.user.email;

    nbookg = new bookg({
        bedid: bedid1,
        user: user

    });
    nbookg.save();



    bookg.find({
        user: user
    }, (err, bookg) => {

        // console.log(bookg)
        res.render('showbookg', {
            bookglists: bookg
        })
    });







});


router.get('/spincode', ensureAuthenticated, (req, res) => {
    res.render('spincode', {
        user: req.user
    })

});
router.post('/spincode', ensureAuthenticated, (req, res) => {
    const pincode = req.body.pincode;

    console.log(req.user.email);
    bed.find({
        pincode: pincode,
        status: false
    }, (err, results) => {
        if (err) {
            console.log(err)
        } else {

            res.render('beddis', {
                results: results,
                user: req.user
            })

        }
    });

});
router.get('/sHospitaltype', ensureAuthenticated, (req, res) => {
    res.render('sHospitaltype', {
        user: req.user
    })

});

router.post('/sHospitaltype', ensureAuthenticated, (req, res) => {
    const sHospitaltype = req.body.sHospitaltype;

    console.log(req.user.email);
    bed.find({
        hospital: sHospitaltype,
        status: false
    }, (err, results) => {
        if (err) {
            console.log(err)
        } else {

            res.render('beddis', {
                results: results,
                user: req.user
            })

        }
    });

})
router.get('/sTimeslot', ensureAuthenticated, (req, res) => {
    res.render('sTimeslot', {
        user: req.user
    })

});

router.post('/sTimeslot', ensureAuthenticated, (req, res) => {
    const sTimeslot = req.body.sTimeslot;

    console.log(req.user.email);
    bed.find({
        tslot: sTimeslot,
        status: false
    }, (err, results) => {
        if (err) {
            console.log(err)
        } else {

            res.render('beddis', {
                results: results,
                user: req.user
            })

        }
    });

})

router.post('/delete', ensureAuthenticated, (req, res) => {
    const deleteid = req.body.deleteid;
    const user = req.user;
    console.log(deleteid);
    bookg.findOne({
        bedid: deleteid
    }, (err, obj) => {
        console.log(obj)
        obj.remove()
    })
    // bookg.remove({bedid:deleteid} ,true);
    res.render('dashboard', {
        user: user
    })

})

//skjcnsiud



module.exports = router;
