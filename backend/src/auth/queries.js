const createUser = "INSERT INTO users (username, password,role) VALUES ($1, $2,$3)";
const findUserByUsername = "SELECT * FROM users WHERE username = $1";
module.exports = {
    createUser,
    findUserByUsername,
  };