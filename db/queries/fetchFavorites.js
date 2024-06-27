const db = require('../connection');

const getFavorites = (userId) => {
  return db.query(`
    SELECT favorite_maps.id as fav_id, favorite_maps.map_id as map_id, maps.title as map_title, maps.thumbnail_photo_url as map_thumbnail_url, users.username as user
    FROM favorite_maps
    JOIN maps ON maps.id = favorite_maps.map_id
    JOIN users ON users.id = favorite_maps.user_id
    WHERE favorite_maps.user_id = $1;`, [userId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFavorites };
