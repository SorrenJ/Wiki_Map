const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));

router.get('/:id', (req, res) => {
  // console.log(req.body);
  // const mapId = req.params.id;
  // const templateVars = {
  //   mapId
  // }
  res.render('map'/*, templateVars*/);
});

module.exports = router;
