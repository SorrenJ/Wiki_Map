const pool = require('../connection');


const addFavorites = function (favorites) {


  const {
    userId,
    mapId
  } = favorites;

  // User inputted queries for creating a new property
  const queryString = `
      INSERT INTO favorite_maps (
       user_id,
     map_id
      ) 
      VALUES ($1, $2)
      RETURNING *;
  `;

  const queryParams = [
    userId,
    mapId
  ];

  // Pool query error handling

  return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));

};

module.exports = { addFavorites };