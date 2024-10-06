const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signupdb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Change from GET to POST for the registration route
app.post("/register", (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    connection.query(query, [username, email, password], (error, results) => {
      if (error) throw error;
      res.json({ message: "User registered successfully" });
    });
  } catch (error) {
    return res.status(500).json({ error: "Registration failed" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});
