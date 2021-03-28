const express= require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router=express.Router();
const User = require('../models/user');
// const randomstring = require('randomstring');
// const mailer = require('../misc/mailer');
const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');
// const multer = require('multer');
const path = require('path');
const bed = require('../models/bed');
const bookg = require('../models/bookg');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// add pet page


// // Set The Storage Engine
// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file,  cb){
//     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
//
// // Init Upload
// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('myImage');






// // Check File Type
// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);
//
//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

// //add pet post
// router.post('/addpet', (req, res) => {
//
//   upload(req, res, (err) => {
//     req.user.pet.push({petimg:req.file.filename, petname:req.body.petname }),
//     req.user.save();
//     if(err){
//       res.render('addpet', {
//         msg: err
//       });
//     } else {
//       if(req.file == undefined){
//         res.render('addpet', {
//           msg: 'Error: No File Selected!'
//         });
//       } else {
//
//
//         res.render('dashboard', {
//           msg: 'File Uploaded!',
//           user:req.user,
//
//           file: `uploads/${req.file.filename}`
//         });
//       }
//     }
//   });
// });



// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);


// router.post('/register',(req,res)=>{
//   const { fname,lname,email,pnum,password,password2} = req.body;
//
//   let errors = [];
//
//   if (!fname || !lname || !email || !password || !pnum ||  !password2 ) {
//     errors.push({ msg: 'Please enter all fields' });
//   }
//
//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }
//
//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }
//
//
//   if (errors.length > 0) {
//     res.render('register', {
//       errors,
//       fname,
//       lname,
//
//       email,
//       pnum,
//       password,
//       password2
//     });
//   } else {
//     User.findOne({ email: email }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         res.render('register', {
//           errors,
//           fname,
//           lname,
//
//           email,
//           pnum,
//           password,
//           password2
//         });
//       } else {
//         // Generate secret token
//         const secretToken = randomstring.generate({
//           length:6,
//           charset:'1234567890'
//         });
//         console.log('secretToken', secretToken);
//         const active =  false ;
//
//         var newuser= new User({
//           fname,
//           lname,
//           email,
//           pnum,
//           password,
//           secretToken,
//           active
//
//
//
//
//         });
//
//
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newuser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newuser.password = hash;
//             newuser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and go to verify'
//                 );
//                 // Compose email
//                 const html = `Hi there,this is swapnil from team zwinger
//                 <br/>
//                 Thank you for registering!
//                 <br/><br/>
//                 Please verify your email by typing the following token:
//                 <br/>
//                 Token: <b>${secretToken}</b>
//                 <br/>
//
//
//                 <br/><br/>
//                 Have a pleasant day.
//                 "JAY SHREE RAM"  `
//
//                 // Send email
//                 mailer.sendEmail('swapnil@ZWINGER.COM', email ,'Please verify your email!' , html);
//                 res.redirect('/users/verify');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//
//       }
//     });
//   }
//
//
// });

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
        nbookg.save();
        bed.updateOne({_id:bedid1} , {
            $set:{status:true}
        });
        // const bedbooked = bed.find({_id:bedid1})
        // console.log(bedbooked.status = true);


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
router.get('/sHospitaltype',  ensureAuthenticated,(req ,res)=> {
    res.render('sHospitaltype', {user:req.user})

});
router.get('/sTimeslot',  ensureAuthenticated,(req ,res)=> {
    res.render('sTimeslot', {user:req.user})

});



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
