const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise"); // Use the promise-based API
const express = require("express");
const router = express.Router();
require("dotenv").config();

// Check if environment variables are set
if (
  !process.env.dbHost ||
  !process.env.dbUser ||
  !process.env.dbPassword ||
  !process.env.database | !process.env.JWT_SECRET
) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const dbConfig = {
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.database,
};

// Create a connection pool for better performance
const pool = mysql.createPool(dbConfig);

// Verify Password
const verifyPassword = async (plainPassword, hashPassword) => {
  try {
    return bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    throw new Error("Error verifying password");
  }
};

// Verify User
const verifyUser = async (user, input) => {
  if (user.username === input.username) {
    return verifyPassword(input.password, user.password);
  }
  return false;
};

// Create JWT token
const generateJWT = (user) => {
  // Generate a token that expires in 1 hour
  return jwt.sign(
    { id: user.userId, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// Login Route
router.post("/login", async (req, res) => {
  const inputs = req.body;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Query the user from the database
    const [rows] = await connection.query(
      "SELECT * FROM project1.users WHERE username = ?",
      [inputs.username]
    );

    // Release the connection back to the pool
    connection.release();

    if (rows.length === 0) {
      return res.status(404).send("User Not Found");
    }

    const user = rows[0]; // Extract the user data

    // Checks Password
    const verified = await verifyUser(user, inputs);
    if (!verified) {
      return res.status(401).send("Invalid Credentials");
    }

    // Generates token
    const token = await generateJWT(user);

    // Sends token
    res.json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
