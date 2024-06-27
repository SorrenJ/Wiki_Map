/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const loginQueries = require('../db/queries/login');
const allMapsQueries = require('../db/queries/fetchAllMaps');

router.get('/', (req, res) => {
  console.log("login GET");
  res.render("login");
});

router.post('/', (req, res) => {
  console.log("POST", req.body);
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userData = {
    email: userEmail,
    password: userPassword
  }
  console.log("Userdata", userData);

  let templateVars;

  loginQueries.getLoggedInUser(userData)
    .then(user => {
      res.cookie('userId', user.id);
      return user.id;
      // res.render('index', templateVars);
      //res.json({ user });
    })
    .then(userId => {
      allMapsQueries.getAllMaps()
        .then(allMaps => {
          const templateVars = {
            userId,
            maps: allMaps
          };
          console.log('TEMPLATE VARS ------------', templateVars);
          res.render('index', templateVars);
        })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
