const db = require('../connection');

const getLoggedInUser = (user) => {
  const {
    email,
    password
  } = user
  return db.query(`
    SELECT id, username
    FROM users WHERE email = $1 AND password = $2;`, [user.email, user.password])
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { getLoggedInUser };
