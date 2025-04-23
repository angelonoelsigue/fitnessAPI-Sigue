const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');
const { errorHandler } = require('../auth');

// **User Registration (Email & Password Only)**
const registerUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {
            const newUser = new User({ email, password: hashedPassword });
            return newUser.save();
        })
        .then(() => res.status(201).json({ message: 'Registered successfully' }))
        .catch(error => errorHandler(error, req, res));
};

// **User Login**
const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) throw new Error('Invalid credentials');

            return bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) throw new Error('Invalid credentials');

                return res.status(200).json({ access: auth.createAccessToken(user) });
            });
        })
        .catch(error => res.status(400).json({ message: error.message }));
};

// **Retrieve User Details**
const getUserDetails = (req, res) => {
    const userId = req.user.id;

    User.findById(userId)
        .select('-password')
        .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });

            return res.status(200).json({ user });
        })
        .catch(error => errorHandler(error, req, res));
};



module.exports = { registerUser, loginUser, getUserDetails };
