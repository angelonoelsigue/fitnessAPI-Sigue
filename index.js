const express = require("express");
const mongoose = require("mongoose");

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

// Environment Setup
require('dotenv').config();

const app = express();

// Connecting to MongoDB Atlas
mongoose.connect(process.env.MONGODB_STRING);

// If the connection is successful, output in the console
mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

// Allows your app to read json data
app.use(express.json());
// Allows your app to read data from forms
app.use(express.urlencoded({extended:true}));

// Use the routes
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = {app,mongoose};