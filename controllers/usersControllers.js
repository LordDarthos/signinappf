const User = require('../models/usersModels');
const mongoose = require('mongoose');

async function userSignUp (req, res) {
    try {
        const { name, email, password, confirm_password } = req.body
        
        const emailUser = await User.findOne({ email: email })
        const nameUser = await User.findOne({ name: name })

        console.log(req.body.name)
        console.log(name)

        if(nameUser) throw new SyntaxError('The name is already in use')
        
        if(emailUser) throw new SyntaxError('The email is already in use')
        
        if(name.length < 6 ) throw new SyntaxError('Name should be at least 6 characters long')
        
        if(password.length < 4) throw new SyntaxError('Password should be at least 4 characters long')
        
        if(password != confirm_password) throw new SyntaxError('Password should be equal in both inputs')
        

        const newUser = new User ( {name, email, password} )
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'You are registered')
        res.redirect('/users/signin')
    
    } catch (err) {
        console.log(err)
        req.flash('error_msg', err)
        res.redirect('/users/signup')
    }
}

module.exports = { userSignUp }