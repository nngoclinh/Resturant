const deleteUser = "DELETE FROM users WHERE username =$1";
const findUserByUsername = "SELECT * FROM users WHERE username = $1";
const editUser = "UPDATE users SET password = $1, role = $2 WHERE username =$3";
const selectUser = "SELECT *FROM users";
module.exports = {
  deleteUser,
  findUserByUsername,
  editUser,
  selectUser
};
