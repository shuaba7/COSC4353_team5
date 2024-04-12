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
    db.query('SELECT * FROM FuelHistory WHERE userID = ?', [userId], (error, results) => {
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
//app.get("/user-fuel-history/:userId", (req, res) => {
  //try {
      //const userId = parseInt(req.params.userId); // Extract userId from URL parameters
      //const data = fs.readFileSync("database.json", "utf8");
      //const fuelInformation = JSON.parse(data).fuelInformation;
      // Filter fuel information based on userId
      //const userFuelHistory = fuelInformation.filter(entry => entry.userID === userId);
      //if (userFuelHistory.length === 0) {
          //return res.status(404).json({ error: "User fuel history not found" });
      //}
      //res.json(userFuelHistory);
  //} catch (error) {
      //console.error("Error reading user fuel history:", error);
      //res.status(500).json({ error: "Internal server error" });
  //}
//});

//FUEL QUOTE FORM
//End point to calculate fuel price
app.get("/user-fuel-quote/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Extract userId from URL parameters

    //Query database to retrieve address based on userID #
    //Temporarily hard coded address
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
      const address = valuesArray.join(', ');

      res.json(address);
    });

  } catch (error) {
    console.error("Error retrieving address: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user-fuel-quote/:userId", (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  const {date, gallons} = req.body;

  try {
      //Query database to find suggested price based on something???
      //temporarily hard coded suggested price
      const suggestedPrice = 2.50;
      
      if (!suggestedPrice) {
        return res.status(404).json({ error: 'Suggested price not found for the given date'});
      }

      
      const totalAmount = suggestedPrice * gallons;

      

      res.json({suggestedPrice, totalAmount});
  } catch (error) {
    console.error("Error calculating price", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/user-fuel-quote/:userId", (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  const newHistory = req.body; // new data to add to fuel history

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
    db.query('INSERT INTO FuelHistory (userId, date, gallons, pricePerGallon, totalAmount) VALUES (?, ?, ?, ?, ?)', 
             [userId, newHistory.date, newHistory.gallons, newHistory.pricePerGallon, newHistory.totalAmount], 
             (insertError, insertResults) => {
      if (insertError) {
        console.error("Error inserting fuel history:", insertError);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json({ message: "Fuel history updated successfully" });
    });
  });
});

app.post('/login', (req, res) => {
    try {
      // Simulate database lookup with Promise
      const username = req.body.username;
      const password = req.body.password;

      // find a user in the db with the same username and pass. hardcoding for now
      const user = {
        "username": "tempUser123",
        "password": "TempPass456!"
      }
  

      if (user) {
          res.send({ status: 'success', message: 'Logged in successfully' });
      } else {
          res.status(401).send({ status: 'error', message: 'Authentication failed' });
      }
  } catch (error) {
      console.error('Login Error:', error);
      res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

app.post('/register', (req, res) => {
    try {
      //create user in the db
      userinfomation = req.body;

      //using tmp user here
      const user = {
        "id":1234,
        "username": "tempUser123",
        "password": "TempPass456!"
      }
      res.send({ status: 'success', message: 'Registered successfully',userId: user.id });
  } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});


app.listen(port, () => { //console.log("Server starting")
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
