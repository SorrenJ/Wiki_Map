const db = require('../connection');

const saveLocations = (newLocationData) => {
  const {
    lng,
    lat,
    map_id
  } = newLocationData;

  console.log(lng, lat, map_id)

  return db.query(`
    INSERT INTO locations (title, description, image, longitude, latitude, map_id, user_id)
    VALUES ('Animal Zoo', 'Large zoo with animals', 'toronto_zoo.jpg', $1, $2, $3, 3)
    RETURNING *;`, [lng, lat, map_id])
      .then(data => {
        return data.rows[0];
      });
};

module.exports = { saveLocations };