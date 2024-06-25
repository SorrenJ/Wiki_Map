const db = require('../connection');

const getFavorites = () => {
  console.log("In Query");
  return db.query(`
    SELECT favorite_maps.id as fav_id, favorite_maps.map_id as map_id, maps.title as map_title, users.username as user
    FROM favorite_maps
    JOIN maps ON maps.id = favorite_maps.map_id
    JOIN users ON users.id = favorite_maps.user_id
    WHERE favorite_maps.user_id = 3;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFavorites };
