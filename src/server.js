// import { LoginSchema, SignupSchema } from "./validation";
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
//middleware for parsing application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));
 //middleware for parsing application/json
 app.use(bodyParser.json());

 const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signupdb",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });



app.get("/regester", async (req, res) => {
  try {
    //get data from request

    // const ValidateData = SignupSchema.parse(req.body);
    const { username, email, password } = req.body;

    const query = "INSERT INTO users (username, email, password) VALUES(?,?,?)";

    connection.query(query,[username,email,password], (error, results) => {
        if(error) throw error;
        console.log("Reestered successful");
        res.json({ message: "User registered successfully" });
    });

  } catch (error) {
    return res.status(500).json({ error: 'Registration failed' });
  }
});

app.post("/login", async (req, res) => {
    try{
        // const validateData = LoginSchema.parse(req.body);
        const { username, password } = req.body;

        const query = "SELECT * FROM users WHERE username =? AND password =?";

        connection.query(query,[username,password], (error, results) => {
            if(error) throw error;
            if(results.length === 0){
                return res.status(401).json({ error: 'Invalid username or password' });
            }
            res.json({ message: "User logged in successfully" });
        });

    }catch(error){
        return res.status(500).json({ error: 'Login failed' });
    };
});

app.listen(5000, () => {
  console.log("Server is running....");
});
