const helpers = {}

function isAuth (req,res,next) {
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        console.log("IsAuthenticated",req.isAuthenticated())
        next();
    } else {
        console.log("IsAuthenticated",req.isAuthenticated())
        // req.flash('error_msg', 'Not authorized')
        
    }
}

module.exports = isAuth