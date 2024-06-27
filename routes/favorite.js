const express = require('express');
const router = express.Router();
const { addFavorites } = require('../db/queries/favorites');


// router.get('/:id', (req, res) => {
//     console.log("userID", req.params.id);
//     const userId = req.params.id;                   //Get map id (:id) from req.params.id
//     res.cookie('user_id', userId);                   //Set map id as map_id in respond cookie
//     res.render("user", { userId });                  //Load to map.ejs
//   });


//   router.get('/users', (req, res) => {
//     console.log("userID", req.params.id);
//     const userId = req.params.id;                   //Get map id (:id) from req.params.id
//     res.cookie('user_id', userId);                   //Set map id as map_id in respond cookie
//     res.render("user", { userId });                  //Load to map.ejs
//   });

//Middleware
router.use("/", (req, res, next) => {
  if(!req.cookies.userId) {
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
        //res.json({ favorite });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error adding favorite');
    });
});




module.exports = router;
