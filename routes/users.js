const router = require('express').Router()
const { userSignUp } = require('../controllers/usersControllers')
const passport = require('passport')
const multer = require('multer')
const upload = multer()
const isAuth = require('../helpers/auth')

router.get('/users/signin', (req, res) => {
    console.log("you have been redirected")
    res.send('Sign inNNNN').status(200)
})

router.get('/users/signup', (req, res) => {
    res.send('Sign up')
    
})

// router.post('/users/signin', passport.authenticate('local', 
// { successRedirect: '/users', failureRedirect: '/users' }), isAuth)

router.get('/users', (req, res) => {
    res.send(req.app.locals.userid)
    console.log("/user",req.user)
})


router.post('/users/signin',(req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { throw err; }
    if (!user) { 
      res.status(204).send('User not found'); }
    else {
      req.logIn(user, (err) => {
        if (err) { throw err }
        req.user.save()
        // req.app.locals.userid = req.user._id
        res.send(req.user._id)
        console.log("/users/signin",req.user)
        // console.log("info", info)
      });
    }
  })(req, res, next);
});




//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     req.login(req.user._id, function (err) { // <-- Log user in
//         return res.redirect('/'); 
//      });
//     console.log("juajua",req.session)
//     console.log(req.user, "jojo")
//     // res.redirect('/users/' + req.user);
//   });













  // function(req, res) {

    // req.login(req.user, function(err) {
    //     if (err) return next(err);
    //     console.log("Request Login supossedly successful.");
    //     // return res.redirect('/admin/filter');
    //   });
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // console.log(req.user)
    // res.redirect('/users/' + req.user.username);
// });
// {
//     successMessage: '/notes',
//     failureRedirect: '/users/signin',
//     failureFlash: true,
    
// }
    
// ))

router.post('/users/signup', upload.none(), userSignUp)

module.exports = router