const db = require('../connection');

const getContributions = () => {
  console.log("In Query Contributions");
  return db.query(`
    SELECT maps.id as map_id, maps.title as map_title, maps.thumbnail_photo_url as map_thumbnail_url, users.id as user_id
    FROM maps
    JOIN users ON users.id = maps.user_id
    WHERE maps.user_id = 3;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getContributions };
