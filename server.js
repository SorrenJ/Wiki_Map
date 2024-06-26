// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');
const locationRoutes = require('./routes/locations');
const favoriteRoutes = require('./routes/favorite');
const allMapsQueries = require('./db/queries/fetchAllMaps');
const createMapRoutes = require('./routes/create-map');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/maps/new', createMapRoutes);
app.use('/maps', locationRoutes);
app.use('/login', loginRoutes);
app.use('/favorites', favoriteRoutes);

app.use('/profiles', profileRoutes);
app.use(cookieParser());
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  allMapsQueries.getAllMaps()
    .then(allMaps => {
      const templateVars = {
        maps: allMaps
      };
      console.log(templateVars);
      res.render('index', templateVars);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving maps:', err);
    });
});

app.get('/login/:id', (req, res) => {
  res.cookie('userId', req.params.id);
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
