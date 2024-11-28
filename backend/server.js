require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const authRoutes = require("./src/auth/router");
const usersRoutes = require("./src/users/router");
const { authenticateToken, authorizeRoles } = require("./src/auth/middleware");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello world!");
});
// routes

app.use("/api/v1/auth", authRoutes);
app.use(
  "/api/v1/users",
  authenticateToken,
  authorizeRoles("admin"),
  usersRoutes
);

//testing
app.get(
  "/api/v1/employee",
  authenticateToken,
  authorizeRoles("employee"),
  (req, res) => {
    res.send("Welcome, employee!");
  }
);
app.get(
  "/api/v1/admin",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.send("Welcome, admin!");
  }
);


app.listen(port, () => console.log(`app listen on port ${port}`));
