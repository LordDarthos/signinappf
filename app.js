const path = require('path')
const express = require('express');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const connectDB = require('./db/mongodb')
const { dbConfig } = require('./dbConfig');
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const MongoStore = require('connect-mongo')(session)


// initiliazations 
const app = express();
require('./db/mongodb')
require('./config/passport')


// settings
app.set('port', process.env.PORT || 5000)
//middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(methodOverride('_method'))
app.use(cookieParser('mySecret'))
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie:{
        secure: false,
        maxAge: 1000 * 60 * 5, // 1 week
        httpOnly: false
    }
}))
app.use(cookieParser('mySecret'))
app.use(passport.initialize())
app.use(passport.session())


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Access-Control-Allow-Credentials', 'true')
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

// app.use(function (req, res, next) {
//     console.log("APP SESSION:",req.session)
//     console.log("APP USER", req.user)
//     console.log("APP LOCALS", res.locals)
//     next();
// });
// app.use(flash())

// app.use((req, res, next) => {
//     console.log(req.session, "SESSION") 
//     console.log(res.locals.user, "LOCALS")
//     // console.log("req.sission.passport.user", req.session.passport.user)
//     next()
// })


//static-files
app.use('/public', express.static(path.join(__dirname, 'public')))


// global-variables
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success_msg')
//     res.locals.error_msg = req.flash('error_msg')
//     res.locals.error = req.flash('error')
//     res.locals.user = req.user || null
//     next()
// })

//routes
app.use(require('./routes/users'))
app.use(require('./routes/index'))
app.use(require('./routes/notes'))







async function initApp (dbConfig) {
    try {
        await connectDB(dbConfig);
        app.listen(app.get('port'), () => console.log(`liston on port ${app.get('port')}`));
    }  catch (err) {
        console.error(err);
        process.exit(0);
    }
}

initApp(dbConfig)
// app.listen(app.get('port'), () => {
//     console.log(`listening on ${app.get('port')}`);
// });


