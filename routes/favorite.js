const express = require('express');
const router = express.Router();
const { addFavorites } = require('../db/queries/favorites');

//Middleware
router.use("/", (req, res, next) => {
  if (!req.cookies.userId) {
    return res.redirect("/login");
  }
  next();
});

router.post('/', (req, res) => {
  const userId = req.cookies.userId; // Extract user ID from cookie
  const { mapId } = req.body;

  addFavorites({ userId, mapId })
    .then(favorite => {
      res.redirect('profiles');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error adding favorite');
    });
});




module.exports = router;
