// Budget API

import compression from 'compression'; // gzip
import jwt from 'jsonwebtoken'; 
import axios from 'axios';
const mysql = require('mysql');

const { expressjwt: exjwt } = require('express-jwt');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const express = require('express');
const cors = require('cors');


const mongoose = require('mongoose');
const  budgetModel  = require("../src/models/MyBudget_schema.js");
let url = 'mongodb://127.0.0.1:27017/budget-data';



//const budget = require('http://localhost:3000/user-data.json')


app.use(express.json());
app.use(compression());
// app.use(cors());
app.use("/",express.static("public"));



const connection = mysql.createConnection({
    host: 'sql5.freemysqlhosting.net',
    user: 'sql5704095',
    password: 'hregPpLPzQ',
    database: 'sql5704095'
  });
  
  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      throw err;
    }
    console.log('Connected to MySQL database');
  });


const secretKey = 'My super secret key';
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, secretKey, { expiresIn: '1m' });
  };

  
  
  console.log('check');

  // Signup
  app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
  
    // Insert the new user into your database
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
      if (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Signup failed' });
      } else {
        res.status(200).json({ message: 'Signup successful' });
      }
    });
  });
  
  // Login 
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    //alert('login' + username + password);
    // Check the username and password against your database
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed' });
      } else {
        if (results.length > 0) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      }
    });
  });

  
  // Protected route
  app.get('/refreshToken', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
  
    try {
      const decoded = jwt.verify(token, secretKey);
  
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp - currentTime < 20) {

        const newToken = jwt.sign({ username: decoded.username }, secretKey, { expiresIn: '1m' });
        res.json({ newToken });
      } else {
        res.status(200).json({ message: 'Token is still valid' });
      }
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });

    const myUserSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
        MyBudget: [{    
        title: String,
        budget: Number,
        color: String
    }]
    });

  
  const userModel = mongoose.model('User', myUserSchema);


    app.get('/budget', async (req, res) => {
        try {
            await mongoose.connect(url);
            const users = await userModel.find({});
            console.log('User data:', users);
            res.json(users);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Unable to fetch data from MongoDB' });
        } finally {
            await mongoose.connection.close();
        }
    });

app.post("/budget", async (req, res) => {
    try {
        await mongoose.connect(url);
        const data = await budgetModel.find({ userID: req.body.userID});
        console.log("Fetched data:", data);
        res.send(data);

        await mongoose.connection.close();
        console.log("Connection closed");
    } catch (error) {
        console.error("Error handling the request:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.post("/addBudget", async (req, res) => {
  console.log('Request body:', req.body);
        try {
            await mongoose.connect(url);
        }   
        catch (error) {
            console.error("Error connecting to the database:", error);
            return res.status(500).send("Error connecting to the database");
        }
        try {
            let newData = new budgetModel(req.body);
            console.log('New data:', newData);
            await newData.save();
        }   
        catch (error) {
            console.error("Error inserting data:", error);
            console.error('Error message:', error.message);
            return res.status(500).send("Error inserting data");
        }
        res.send("Data Entered Successfully");
        try {
            await mongoose.connection.close();
        }   
        catch (error) {
            console.error("Error closing the connection:", error);
            return res.status(500).send("Error closing the connection");
        }
});



app.get("/hello", (req,res) => {
    res.send("Hello World!");
})




app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});