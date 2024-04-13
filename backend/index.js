//api methods
require('dotenv').config();

const express = require("express");
const mysql = require("mysql");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// USER INFO  
  app.get("/user-information/:userId", (req, res) => {
    try {
      const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  
      // Query the database to get user information
      db.query('SELECT * FROM ClientInformation WHERE userId = ?', [userId], (error, results) => {
        if (error) {
          console.error("Error fetching user information:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        // Check if user was found
        if (results.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
  
        // User found, send user information
        res.json(results[0]);
      });
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


// Endpoint to update user information

app.put("/update-user-information/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Extract userId from URL parameters
    const newData = req.body; // New data to update user information
    
    // Execute SQL query to update user information
    db.query('UPDATE ClientInformation SET ? WHERE userId = ?', [newData, userId], (error, results) => {
      if (error) {
        console.error("Error updating user information:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User information updated successfully" });
    });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//FUEL HISTORY
// Endpoint to retrieve user fuel history
app.get("/user-fuel-history/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Extract userId from URL parameters

    // Query the database to get user fuel history
    db.query('SELECT * FROM fuelQuote WHERE userID = ?', [userId], (error, results) => {
      if (error) {
        console.error("Error fetching user fuel history:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Check if user fuel history was found
      if (results.length === 0) {
        return res.status(404).json({ error: "User fuel history not found" });
      }

      // User fuel history found, send user fuel history information
      res.json(results);
    });
  } catch (error) {
    console.error("Error reading user fuel history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//FUEL QUOTE FORM
//End point to calculate fuel price
app.get("/user-fuel-quote/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Extract userId from URL parameters

    //Query database to retrieve address based on userID #
    db.query('SELECT address1, address2, city, state, zipcode FROM ClientInformation WHERE userId = ?', [userId], (error, results) => {
      if (error) {
        console.error("Error fetching user information:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        // If user is not found, return 404 status code
        return res.status(404).json({ error: 'User not found' });
      }

      const user = results[0]; // Assuming only one user is returned

      const { address1, address2, city, state, zipcode } = user;
      const userSubset = { address1, ...(address2 && { address2 }), city, state, zipcode };
      const valuesArray = Object.values(userSubset);
      const address = valuesArray.join(' ');

      res.json({userId: userId, address: address, message: "GETuser-fuel-quote-success"});
    });

  } catch (error) {
    console.error("Error retrieving address: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user-fuel-quote/:userId", (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  var {date, gallons} = req.body;

  try {
      //Query database to find suggested price based on something???
      //temporarily hard coded suggested price
      var suggestedPricePerGallon = 2.50;
      
      if (!suggestedPricePerGallon) {
        return res.status(404).json({ error: 'Suggested price not found for the given date'});
      }

      
      var totalAmountDue = suggestedPricePerGallon * gallons;


      res.json({suggestedPricePerGallon: suggestedPricePerGallon, totalAmountDue: totalAmountDue, message: "POSTuser-fuel-quote-success"});
  } catch (error) {
    console.error("Error calculating price", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/user-fuel-quote/:userId", (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  const newHistory = req.body; // new data to add to fuel history

  // Validate data
  if (typeof newHistory.gallonsRequested !== 'number' ||
      typeof newHistory.suggestedPricePerGallon !== 'number' ||
      typeof newHistory.totalAmountDue !== 'number' ||
      !newHistory.deliveryAddress ||
      !newHistory.deliveryDate) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  // Check if the user exists
  db.query('SELECT * FROM ClientInformation WHERE userId = ?', [userId], (error, results) => {
    if (error) {
      console.error("Error checking user existence:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Insert new fuel history into the database
    var sql = 'INSERT INTO fuelQuote (userId, gallonsRequested, deliveryAddress, deliveryDate, suggestedPricePerGallon, totalAmountDue) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(sql, [userId, newHistory.gallonsRequested, newHistory.deliveryAddress, newHistory.deliveryDate, newHistory.suggestedPricePerGallon, newHistory.totalAmountDue], 
      function (err, data) {
      if (err) {
        console.error("Error inserting fuel history:", insertError);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json({ message: "Fuel history updated successfully" });
    });
  });
});

app.post('/login', (req, res) => {

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  // Adjust SQL to select the user where username matches.
  const sql = 'SELECT * FROM userCredentials WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send({ status: 'error', message: 'Error accessing the database', error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).send({ status: 'error', message: 'Invalid username or password' });
    }
    // If the user is found and the password hash matches, log in the user.
    res.send({ status: 'success', message: 'Logged in successfully',userId: results[0].userId });

  });
});

app.post('/register', (req, res) => {

  const { username, password, userId } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  try {
    const sql = 'INSERT INTO userCredentials (userId,username, password) VALUES (?,?, ?)';
    db.query(sql, [userId,username, password], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'Error registering the user', error: err.message });
      }
      res.send({ status: 'success', message: 'Registered successfully',userId: result.userId });
    });
  } catch (err) {
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
  
});


app.listen(port, () => { //console.log("Server starting")
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
