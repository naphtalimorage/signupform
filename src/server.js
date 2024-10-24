const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { z } = require("zod");
const auth = require("./auth"); // Import Lucia configuration


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "signupdb",
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("Sorry! invalid connection", err);
//   }
//   console.log("Connected to MySQL!");
// });

const registrationSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  
});

app.post("/register", async (req, res) => {
  try {

    registrationSchema.parse(req.body);
    const { username, email, password } = req.body;

    const checkUserQuery = "SELECT * FROM users WHERE username= ? OR email= ? ";
    //check if the user already exist in the database
    connection.query(checkUserQuery,[username, email],async (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          return res.status(409).json({ error: "User with this email or username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
          return res.status(500).json({ error: "Failed to hash password" });
        }


        const user = await auth.createUser({
          email,
          username,
          passwordHash: hashedPassword,
        });
        const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
          connection.query(insertUserQuery,[username, email, hashedPassword],(error, result) => {
              if (error) throw error;
              return res.status(201).json({ message: "User registered successfully" });
            }
          );
      }
    );
  } catch (error) {
    if(error instanceof z.ZodError) {
      return res.status(400).json({error: error.errors});
    }
    return res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = "SELECT * FROM users WHERE username =?";
    connection.query(query, [username], async (error, result) => {
      if (error) throw error;
      if (result.length === 0) {
        return res.status(401).json({error: "Invalid Username . Please try again."});
      }

      const user = result[0];
      const hashedPassword = user.password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if(isMatch){
        return res.status(200).json({ message: "Logged in successfully" });
      } else {
        return res.status(401).json({
          error: "Invalid Username or Password. Please try again.",
        });
      }
    }); 
} catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
});
app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});
