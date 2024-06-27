const express = require('express');
const router = express.Router();
const loginQueries = require('../db/queries/login');
const allMapsQueries = require('../db/queries/fetchAllMaps');

router.get('/', (req, res) => {
  res.render("login");
});

router.post('/', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userData = {
    email: userEmail,
    password: userPassword
  }

  loginQueries.getLoggedInUser(userData)
    .then(user => {
      res.cookie('userId', user.id);
      res.redirect('/');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
