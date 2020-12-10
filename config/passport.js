const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/usersModels')

// passport.use(new localStrategy({
//     usernameField: 'email'
// }, async (email, password, done) => {
//     const user = await User.findOne({email: email})
//     if(!user) {
//         return done(null, false, {message: 'Not user found'})
//     } else {
//         const match = await user.matchPassword(password)
//         if(match) {
//             return done(null, user)
//         } else {
//             return done(null, false, {message: 'Incorrect password'})
//         }
//     }
// }))

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},  async (req, email, password, done) => {
        const user = await User.findOne({ email: email })
        if (!user) { 
            console.log("error de user")
            return done(null, false, {message: 'Not user found'}); 
        } else {
            const match = await user.matchPassword(password)
            if (!match) { 
                console.log("error de pass")
                return done(null, false, {message: 'Incorrect password'}); 
            }
        }
        console.log("USUARIO CORRECTO")
        console.log(user)
        return done(null, user);  
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id)
    console.log("serialized user:", user._id)   
    
})

passport.deserializeUser((id, done) => {
    console.log("ALAVERGAAAAAAAAA")
    User.findById(id, function(err, user)  {
        done (err, user)
        console.log("deserilized user", user, err)
        
    })
})