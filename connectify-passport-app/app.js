const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const ejs = require('ejs').renderFile;
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);

const router = require('./routes/route');
const User = require('./models/user');
const middleWare = require('./middleware/middleware');
const {localStrategy} = require('./middleware/middleware');

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));

app.engine('html', ejs);
app.set('view engine', 'html');


// session connect to Mongodb Store
const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/userBD",
    collection: 'app_sessions'
})
store.on('error', function(error) {
    console.log(error);
});

// connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/userBD');
mongoose.connection.once('open', (err) => {
    if(!err){
        console.log('Connected to Mongodb');
    }
})

app.use(
    session({
        secret: "This is my secret key",
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 50000,
        }, 
        resave: false,
    })
)

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  
passport.deserializeUser(async function (id, done) {
    await User.findById(id).then((user) => done(null, user));
});

passport.use(localStrategy());

  app.use('/', router);

app.listen(9000, ()=> {
    console.log('Server running on port 9000');
})