const db = require('../connection');

const getLoggedInUser = (user) => {
  console.log("Query", user)
  const {
    email,
    password
  } = user
  return db.query(`
    SELECT id, username
    FROM users WHERE email = $1 AND password = $2;`, [user.email, user.password])
    .then(data => {
      console.log(data.rows);
      return data.rows[0];
    });
};

module.exports = { getLoggedInUser };
