const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/mogoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');

dotenv.config({ path: 'config/.env' });

const app = express();

//set ejs template engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

// for style and script
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

// passport authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

// listen to port
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Successfully connected to Server`);
});
