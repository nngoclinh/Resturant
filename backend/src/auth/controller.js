const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const queries = require("./queries");
const pool = require("../../db");
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(queries.findUserByUsername, [username]);
    if (result.rows.length !== 0) {
      return res.status(409).json("Username already existed");
    }
    pool.query(queries.createUser, [username, hashedPassword, "costumer"]);
    res.status(201).send("User created");
    console.log("User created");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
};
// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(queries.findUserByUsername, [username]);
    const user = result.rows[0];

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json("It seems the username or password doesn’t match our records");
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      } 
    );
    res.json({ token });
    console.log("User found and token generated");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  }
};
module.exports = {
  registerUser,
  loginUser,
};
