const db = require('../connection');

const getAllMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject(err);
    })
};

module.exports = { getAllMaps };