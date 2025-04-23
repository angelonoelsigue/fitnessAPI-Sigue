const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verify } = require('../auth');

// **User Registration (Email & Password Only)**
router.post('/register', userController.registerUser);

// **User Login**
router.post('/login', userController.loginUser);

// **Retrieve User Details using route parameter**
router.get('/details', verify, userController.getUserDetails);

module.exports = router;

