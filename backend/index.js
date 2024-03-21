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


// FOR TESTING PURPOSES
// Endpoint to serve user information from a JSON file 
app.get("/user-information/:userId", (req, res) => {
    try {
      const userId = parseInt(req.params.userId); // Extract userId from URL parameters
      const data = fs.readFileSync("database.json", "utf8");
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


app.listen(port, () => { //console.log("Server starting")
  console.log(`Server is running on port ${port}`);
});
