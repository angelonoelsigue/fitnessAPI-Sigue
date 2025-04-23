const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');
const { errorHandler } = require('../auth');

// **User Registration (Email & Password Only)**
const registerUser = (req, res) => {
    const { email, password } = req.body;

    console.log("Received registration request:", email);

    if (!email || !password) {
        console.log("Validation Error: Email or Password missing");
        return res.status(400).send({ message: 'Email and password are required' });
    }

    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                console.log("User already exists:", email);
                return res.status(400).send({ message: 'User already exists' });
            } else {
                console.log("Hashing password for:", email);
                return bcrypt.hash(password, 10).then(hashedPassword => {
                    console.log("Creating new user:", email);
                    const newUser = new User({ email, password: hashedPassword });
                    return newUser.save().then(() => {
                        console.log("User registered successfully:", email);
                        res.status(201).send({ message: 'Registered successfully' });
                    });
                });
            }
        })
        .catch(error => {
            console.error("Error during registration:", error);
            errorHandler(error, req, res);
        });
};

// **User Login**
const loginUser = (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    if (!email || !password) {
        console.log("Validation Error: Email or Password missing");
        return res.status(400).send({ message: 'Email and password are required' });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                console.log("No account found for:", email);
                return res.status(404).send({ message: 'Invalid credentials' });
            } else {
                console.log("User found:", email);
                return bcrypt.compare(password, user.password).then(isMatch => {
                    if (!isMatch) {
                        console.log("Incorrect password for:", email);
                        return res.status(401).send({ message: 'Invalid credentials' });
                    } else {
                        console.log("Login successful for:", email);
                        res.status(200).send({ access: auth.createAccessToken(user) });
                    }
                });
            }
        })
        .catch(error => {
            console.error("Login error:", error.message);
            res.status(400).send({ message: error.message });
        });
};

// **Retrieve User Details**
const getUserDetails = (req, res) => {
    const userId = req.user.id;

    console.log("Fetching user details for ID:", userId);

    User.findById(userId)
        .select('-password')
        .then(user => {
            if (!user) {
                console.log("User not found:", userId);
                return res.status(404).send({ message: "User not found" });
            } else {
                console.log("User details retrieved:", user.email);
                return res.status(200).send({ user });
            }
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
            errorHandler(error, req, res);
        });
};

module.exports = { registerUser, loginUser, getUserDetails };
