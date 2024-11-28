const queries = require("./queries");
const pool = require("../../db");
const bcrypt = require("bcrypt");
const deleteUser = async (req, res) => {
  try {
    const username = req.query.username;
    const result = await pool.query(queries.findUserByUsername, [username]);
    if (!result.rows.length) {
      return res.status(404).send("No users found. Couldn't remove.");
    }
    pool.query(queries.deleteUser, [username]);
    return res.status(200).send("Users remove successfully");
  } catch (error) {
    console.error("Error removing users:", error);
    res.status(500).send("Error removing users");
  }
};
const editUser = async (req, res) => {
  try {
    const username = req.query.username;
    const { password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(queries.findUserByUsername, [username]);
    if (!result.rows.length) {
      return res.status(404).send("No users found. Couldn't edit.");
    }
    pool.query(queries.editUser, [hashedPassword,role,username]);
    return res.status(200).send("Users edited successfully");
  } catch (error) {
    console.error("Error editing users:", error);
    res.status(500).send("Error editing users");
  }
};
module.exports = {
  deleteUser,
  editUser,
};
