const db = require('../connection');

const addMap = (mapData) => {
  const {
    mapTitle,
    mapDescription,
    mapThumbnailUrl,
    userId
  } = mapData;

  return db.query(`
    INSERT INTO maps (title, description, thumbnail_photo_url, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [mapData.mapTitle, mapData.mapDescription, mapData.mapThumbnailUrl, mapData.userId])
    .then(data => {
      return data.rows[0];
    })
};

module.exports = { addMap };
