const db = require('../connection');

const addMap = (mapData) => {
  const {
    mapTitle,
    mapDescription,
  } = mapData;

  return db.query(`
    INSERT INTO maps (title, description, user_id)
    VALUES ($1, $2, 3)
    RETURNING *;
  `, [mapData.mapTitle, mapData.mapDescription])
    .then(data => {
      return data.rows[0];
    })
};

module.exports = { addMap };
