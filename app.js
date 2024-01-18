const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const session  = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://avisaxena3019:cxpa7mDAsUKXy198@cluster0.gphugxp.mongodb.net/shop';

const app = express();

const csrfProtection = csrf();

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));  // Throws error(and it is passed to next middleware: next(error), will be caught by the 'special') if we have a filetype data
/*
If we just use the urlencoded parser of the bodyparser:
If incomming data has file type data but enctype is not set to multipart(it is default), url encoded will use file name as that field value and somewhere in the
future, we might not face any problem. But if no file is choosen, in future, that value will be required. It will be unavailable, and hence, error will be thrown 
and will be dealt by the special middleware.
If the enctype is set to multipart and we still only use the urlencoded parser, error will be thrown straightaway and problems like invalidcsrf, res locals not set are there.
Deal with them in error.ejs pages.// ***** 
*/
app.use(multer.single('image'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false, 
        store: store})
);
//AFTER we initialize the session, 
app.use(csrfProtection);
app.use(flash()); // Now we can use flash anywhere with the req object

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    // throw new Error('Dummy');
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        // throw new Error('Dummy2');
        if(!user){
            return next();
        }
        // NOTE: The user written in session object is just the data and not a mongoose model. 
        // So, we are storing the user(mongoose model) in req object directly so that we can get 
        // it from there and use methods over it like user.save() in controllers.
        req.user = user;
        next()
    })
    .catch(err => {
        //async code => pass the error to this special middleware
        //in sync code, just throwing the error passes the control to the special error handling middleware
        next(new Error(err));
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

//The global express error handling middleware... express knows that when error is passed to next, come here
app.use((error, req, res, next) => {
    console.log('special');
    console.log(error);
    // to avoid the loop of error - render 500, we directly render the page from here and not use the controller
    res.status(500).render('500', { 
        pageTitle: 'Error!', 
        path: '/500',
        isAuthenticated: req.session.isLoggedIn  // ***** 
    });
});

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log('done');
        app.listen(3000);
    })
    .catch(err => console.log(err));

