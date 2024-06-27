const express = require('express');
const router = express.Router();
const favoriteMapsQueries = require('../db/queries/fetchFavorites');
const contributionMapsQueries = require('../db/queries/fetchContributions');

//Middleware
router.use("/", (req, res, next) => {
  if (!req.cookies.userId) {
    return res.redirect("/login");
  }
  next();
});

router.get('/', (req, res) => {
  const userId = req.cookies.userId;
  const templateVars = {
    userId: userId
  };
  res.render("profile", templateVars);
});

router.get('/favs', (req, res) => {
  const userId = req.cookies.userId;
  favoriteMapsQueries.getFavorites(userId)
    .then(favorites => {
      res.json({ favorites });
    })
});

router.get('/contributions', (req, res) => {
  const userId = req.cookies.userId;
  contributionMapsQueries.getContributions(userId)
    .then(contributions => {
      res.json({ contributions });
    })
});

module.exports = router;
