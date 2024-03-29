//api methods

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 3000;
//var app = Express();
app.use(express.json());
app.use(cors());



// USER INFO
app.get("/user-information/:userId", (req, res) => {
    try {
      const userId = parseInt(req.params.userId); // Extract userId from URL parameters
      const data = fs.readFileSync("database.json", "utf8"); // FOR TESTING PURPOSES
      const userInformation = JSON.parse(data).userInformation;
      const user = userInformation.find(user => user.userId === userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error reading user information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// Endpoint to update user information
app.put("/update-user-information/:userId", (req, res) => {
    try {
        const userId = parseInt(req.params.userId); // Extract userId from URL parameters
        const newData = req.body; // New data to update user information
        const data = fs.readFileSync("database.json", "utf8");
        let userInformation = JSON.parse(data).userInformation;
        const index = userInformation.findIndex(user => user.userId === userId);
        if (index === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update user information with the new data
        userInformation[index] = { ...userInformation[index], ...newData };
        // Write updated user information back to the JSON file
        fs.writeFileSync("database.json", JSON.stringify({ userInformation }));
        res.json({ message: "User information updated successfully" });
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
      const data = fs.readFileSync("database.json", "utf8");
      const fuelInformation = JSON.parse(data).fuelInformation;
      // Filter fuel information based on userId
      const userFuelHistory = fuelInformation.filter(entry => entry.userID === userId);
      if (userFuelHistory.length === 0) {
          return res.status(404).json({ error: "User fuel history not found" });
      }
      res.json(userFuelHistory);
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
    //Temporarily hard coded address
    const data = fs.readFileSync("database.json", "utf8"); // FOR TESTING PURPOSES
    const userInformation = JSON.parse(data).userInformation;
    const user = userInformation.find(user => user.userId === userId);

    if (!user) {
      // If user is not found, return 404 status code
      return res.status(404).json({ error: 'User not found' });
    }

    const {address1, address2, city, state, zipcode} = user;
    const userSubset = {address1, ...(address2 && {address2}), city, state, zipcode};
    const valuesArray = Object.values(userSubset);
    const address = valuesArray.join(', ');

    res.json(address);
  } catch (error) {
    console.error("Error retrieving address: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user-fuel-quote/:userId", (req, res) => {
  const userId = parseInt(req.params.userId); // Extract userId from URL parameters
  const {date, gallons} = req.body;

  try {
      //Query database to find suggested price based on provided date and address
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

  try {
    const userId = parseInt(req.params.userId); // Extract userId from URL parameters
    newHistory = req.body; // new data to add to fuel history
    fs.readFile("database.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading database file:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      let fuelInformation;
      try {
        fuelInformation = JSON.parse(data).fuelInformation;
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        return res.status(500).json({ error: "Internal server error" });
      }
    fuelInformation.push(newHistory);

    fs.writeFileSync("database.json", JSON.stringify({ fuelInformation }), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to database file:", writeErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json({ message: "Fuel history updated successfully" });
    });
  });
  } catch (error) {
    console.error("Error calculating price", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
