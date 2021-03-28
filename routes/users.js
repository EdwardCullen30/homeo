const express= require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router=express.Router();
const User = require('../models/user');

const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');

const path = require('path');
const bed = require('../models/bed');
const bookg = require('../models/bookg');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));









router.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
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

router.get('/search',  ensureAuthenticated,(req ,res)=> {
    res.render('search', {user:req.user})

});

router.get('/scritLevel',  ensureAuthenticated,(req ,res)=> {
    res.render('scritLevel', {user:req.user})

});

router.get('/showbooking', ensureAuthenticated , (req,res)=>{
    const user=req.user.email;
    bookg.find({user:user},(err , bookg)=>{

        // console.log(bookg)
        res.render('showbookg' , {bookglists:bookg})
    });
})

router.post('/scritLevel' , ensureAuthenticated, (req, res)=>{
    const critLevel= req.body.critLevel;

    console.log(req.user.email);
    bed.find({critLevel:critLevel, status:false},(err , results)=>{
        if(err){
            console.log(err)
        }else{

            res.render('beddis' , {results:results, user:req.user})

        }
    });



});

router.post('/bookbed' , ensureAuthenticated , (req,res)=>{
    const bedid1 = req.body.bedid;
    const user=req.user.email;
    try{
        nbookg = new bookg({
            bedid:bedid1,
            user:user

        });

        bed.findOneAndUpdate({
            query:{_id:bedid1} ,
            update: {"$set" :
                {status:true}
            },

        })

        // const Bed = bed.findOne({_id:bedid1})
        // Bed.status=true ;
        // // console.log(bedbooked.status = true);
        // Bed.save();


        bookg.find({user:user},(err , bookg)=>{

            // console.log(bookg)
            res.render('showbookg' , {bookglists:bookg})
        });
    }catch(e){
        console.log(e)
    }






}) ;


router.get('/spincode',  ensureAuthenticated,(req ,res)=> {
    res.render('spincode', {user:req.user})

});
router.post('/spincode' ,ensureAuthenticated, (req ,res)=>{
    const pincode= req.body.pincode;

    console.log(req.user.email);
    bed.find({pincode:pincode, status:false},(err , results)=>{
        if(err){
            console.log(err)
        }else{

            res.render('beddis' , {results:results, user:req.user})

        }
    });

} ) ;
router.get('/sHospitaltype',  ensureAuthenticated,(req ,res)=> {
    res.render('sHospitaltype', {user:req.user})

});

router.post('/sHospitaltype' , ensureAuthenticated , (req ,res)=>{
    const sHospitaltype= req.body.sHospitaltype;

    console.log(req.user.email);
    bed.find({hospital:sHospitaltype, status:false},(err , results)=>{
        if(err){
            console.log(err)
        }else{

            res.render('beddis' , {results:results, user:req.user})

        }
    });

} )
router.get('/sTimeslot',  ensureAuthenticated,(req ,res)=> {
    res.render('sTimeslot', {user:req.user})

});

router.post('/sTimeslot' , ensureAuthenticated, (req ,res)=>{
    const sTimeslot= req.body.sTimeslot;

    console.log(req.user.email);
    bed.find({tslot:sTimeslot, status:false},(err , results)=>{
        if(err){
            console.log(err)
        }else{

            res.render('beddis' , {results:results, user:req.user})

        }
    });

})



// router.route('/search').get( (req, res) =>{
//     res.render('search', {user:user})
// });

// router.route('/verify')
//   .get(forwardAuthenticated, (req, res) => {
//     res.render('verify');
//   })
//   .post(async (req, res, next) => {
//     try {
//       const { secretToken } = req.body;
//
//       // Find account with matching secret token
//       const user = await User.findOne({ 'secretToken': secretToken });
//       if (!user) {
//         req.flash('error', 'No user found.');
//         res.redirect('/users/verify');
//         return;
//       }
//
//       user.active = true;
//       user.secretToken = '';
//       await user.save();
//
//       req.flash('success', 'Thank you! Now you may login.');
//       res.redirect('/users/login');
//     } catch(error) {
//       next(error);
//     }
//   })

module.exports=router;
