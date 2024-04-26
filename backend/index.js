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
        if (error) 
        {
          console.error("Error fetching user information:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        // Check if user was found
        if (results.length === 0) 
        {
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
//RETRIEVE ADDRESS FOR FUEL QUOTE FORM
app.get("/user-fuel-quote/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Extract userId from URL parameters

    //Query database to retrieve address based on userID #
    const sql = 'SELECT address1, address2, city, state, zipcode FROM ClientInformation WHERE userId = ?';
    db.query(sql, [userId], (error, results) => {
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

      res.json({userId: userId, address: address, message: "GETuser-fuel-quote-success"});
    });

  } catch (error) {
    console.error("Error retrieving address: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//PRICING MODULE
//RETURNS SUGGESTED PRICE PER GALLON AND TOTAL AMOUNT DUE
app.post("/user-fuel-quote/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  var gallonsRequested = req.body.gallons;

  try {
    var currentPricePerGallon = 1.50;
    var state;
    var locationFactor;
    var rateHistoryFactor;
    var gallonsRequestedFactor;
    var companyProfitFactor = 0.10;

    
    // Fetch state
    const stateResults = await db.query('SELECT state FROM ClientInformation WHERE userId = ?', [userId]);
    if (!stateResults || stateResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    state = stateResults[0];
    locationFactor = state === 'Texas' ? 0.02 : 0.04;

    // Determine rate history factor
    const historyResults = await db.query('SELECT * FROM fuelQuote WHERE userID = ?', [userId]);
    rateHistoryFactor = historyResults && historyResults.length > 0 ? 0.01 : 0;

    // Determine gallons requested factor
    gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;

    // Calculate margin and suggested price
    var margin = (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor) * currentPricePerGallon;
    var suggestedPrice = currentPricePerGallon + margin;
    const totalAmountDue = suggestedPrice * gallonsRequested;

    res.json({
      suggestedPrice: suggestedPrice.toFixed(2),
      totalAmount: totalAmountDue.toFixed(2),
      message: "POST user-fuel-quote-success"
    });

    /*
    pricingModule(userId, gallonsRequested, (error, suggestedPrice) => {
      if (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!suggestedPrice) {
        return res.status(404).json({ error: "Cannot calculate suggested price per gallon" });
      }

      const totalAmountDue = suggestedPrice * gallonsRequested;
      
      res.json({
        suggestedPrice: suggestedPrice,
        totalAmount: totalAmountDue,
        message: "POST user-fuel-quote-success"
      });
    });
    */
  } catch (error) {
    console.error("Error calculating price", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/*
//PRICING MODULE
function pricingModule(userId, gallons, callback) {
  var currentPricePerGallon = 1.50;
  var state;
  var locationFactor;
  var rateHistoryFactor;
  var gallonsRequestedFactor;
  var companyProfitFactor = 0.10;

  //Determine location factor
  const sqlState = 'SELECT state FROM ClientInformation WHERE userId = ?';
  db.query(sqlState, [userId], (error, results) => {
    if (error) {
      console.error("Error querying state: ", error);
      callback(error, null);
      return;
    }

    if (results.length === 0) {
      callback(null, null) //user not found
      return;
    }
    
    state = results[0].state;
    
    if (state === 'Texas') {
      locationFactor = 0.02;
    } 
    else {
      locationFactor = 0.04;
    }
  });

  //Determine rate history factor
  const sqlHistory = 'SELECT * FROM fuelQuote WHERE userID = ?';
  db.query(sqlHistory, [userId], (error, results) => {
    if (error) {
      console.error("Error querying history: ", error);
      callback(error, null);
      return;
    }

    if (results.length === 0) {
      rateHistoryFactor = 0;
    }
    else {
      rateHistoryFactor = 0.01;
    }
  });

  //Determine gallons requested factor
  if (gallons > 1000) {
    gallonsRequestedFactor = 0.02;
  }
  else {
    gallonsRequestedFactor = 0.03;
  }

  var margin = (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor) * currentPricePerGallon;
  var suggestedPrice = currentPricePerGallon + margin;
  callback(null, suggestedPrice);
}
*/

//UPDATE FUEL QUOTE HISTORY
app.put("/user-fuel-quote/:userId", (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  const newHistory = req.body.userData; // new data to add to fuel history

  if (typeof newHistory.gallonsRequested !== 'number' ||
      !newHistory.suggestedPricePerGallon ||
      !newHistory.totalAmountDue ||
      !newHistory.deliveryAddress ||
      !newHistory.deliveryDate) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  
  // Check if the user exists
  db.query('SELECT userId FROM ClientInformation WHERE userId = ?', [userId], (error, results) => {
    if (error) {
      console.error("Error checking user existence:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
  });

  // Insert new fuel history into the database
  const sql = 'INSERT INTO fuelQuote (userId, gallonsRequested, deliveryAddress, deliveryDate, suggestedPricePerGallon, totalAmountDue) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [userId, newHistory.gallonsRequested, newHistory.deliveryAddress, newHistory.deliveryDate, newHistory.suggestedPricePerGallon, newHistory.totalAmountDue], 
    function (err, data) {
    if (err) {
      console.error("Error inserting fuel history:", insertError);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json({ message: "Fuel history updated successfully" });
  });
  
  //res.json({ message: "Fuel history updated successfully" }); FOR DEBUGGING PURPOSES
});

const bcrypt = require('bcrypt');
const saltRounds = 10; // Cost factor for hashing


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  // Adjust SQL to select the user where username matches.
  const sql = 'SELECT * FROM userCredentials WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).send({ status: 'error', message: 'Error accessing the database', error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).send({ status: 'error', message: 'Invalid username or password' });
    }
    
    // Verify the hashed password
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).send({ status: 'error', message: 'Error verifying password', error: err.message });
      }
      if (!isMatch) {
        return res.status(401).send({ status: 'error', message: 'Invalid username or password' });
      }

      // If the user is found and the password hash matches, log in the user.
      res.send({ status: 'success', message: 'Logged in successfully', userId: results[0].userId });
    });
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  // Hash the password before storing it
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send({ message: 'Error hashing password', error: err.message });
    }

    // Insert into userCredentials table with the hashed password
    const userSql = 'INSERT INTO userCredentials (username, password) VALUES (?, ?)';
    db.query(userSql, [username, hashedPassword], (err, userResult) => {
      if (err) {
        return res.status(500).send({ message: 'Error registering the user', error: err.message });
      }

      // Assuming you also want to insert into ClientInformation as before
      const userId = userResult.insertId;
      const clientSql = 'INSERT INTO ClientInformation (userId, firstName, lastName, address1, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(clientSql, [userId, 'First Name', 'Last Name', 'Address 1', 'Address 2', 'City', '', ''], (err, clientResult) => {
        if (err) {
          return res.status(500).send({ message: 'Error adding client information', error: err.message });
        }

        res.send({ status: 'success', message: 'Registered successfully', userId: userId });
      });
    });
  });
});


app.listen(port, () => { //console.log("Server starting")
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
