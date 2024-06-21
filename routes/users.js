/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const favoriteHelpers = require("../db/queries/favorites")
const express = require('express');
const router  = express.Router();

// router.get('/', (req, res) => {
//   res.render('users');
// }); 
router.post('/', (req, res) => {
  // res.render('users');
  console.log(req.body);

favoriteHelpers.addFavorites(req.body)
.then(favorite => {
  res.json({ favorite });

}


)
})







module.exports = router;
