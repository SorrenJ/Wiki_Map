const db = require('../connection');

const saveLocations = (newLocationData) => {
  const {
    lng,
    lat,
    loc_id
  } = newLocationData;

  return db.query(`
    UPDATE locations
    SET longitude = $1, latitude = $2
    WHERE id = $3
    RETURNING *;`, [lng, lat, loc_id])
      .then(data => {
        return data.rows[0];
      });
};

module.exports = { saveLocations };
