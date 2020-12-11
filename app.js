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
    origin: 'https://signinapp.herokuapp.com',
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



//static-files
// app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req,res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


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



