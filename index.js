const express = require('express');
const session = require('express-session');
var path = require("path");
const passport = require('./config/passport');
const db = require('./config/database');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Routes
const authRoutes = require('./src/routes/auth');
const emailRoutes = require('./src/routes/email');
const { syncEmails } = require('./src/modules/emailSync');

app.use('/auth', authRoutes);
app.use('/emails', emailRoutes);

app.get('/', (req, res) => {
  res.render('login');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
