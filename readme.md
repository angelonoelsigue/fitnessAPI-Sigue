# Fitness-API

## Overview  
The **Fitness-API** module provides essential functionalities for authentication and workout tracking.

### User Registration  
Registers a new user with an email and password.

#### **Endpoint**  
`POST /users/register`

#### **Request Body**
{
  "email": "test@mail.com",
  "password": "yourSecurePassword"
}


### User Login (authentication & token generation)
Authenticates the user and generates an access token.

#### **Endpoint**  
`POST /users/login`

#### **Request Body**
{
  "email": "test@mail.com",
  "password": "yourSecurePassword"
}


### Retrieving User Details (protected access via token)
Retrieves the logged-in user's details using a token instead of an ID.
Uses protected access via authentication middleware.

#### **Endpoint**  
`GET /users/details`
Requires Authorization Token (Bearer Token).

### Workout Management** (CRUD operations for workouts) 
Allows creating, updating, fetching, and deleting workouts for a user.

### Add Workout

#### **Endpoint**  
`POST /workouts/addWorkout`
Requires Authorization Token (Bearer Token).

#### **Request Body**
{
  "name": "Morning Cardio",
  "duration": "30 mins",
  "status": "pending"
}

### Retrieve Workouts

#### **Endpoint**  
`GET /workouts/getMyWorkouts`
Requires Authorization Token (Bearer Token).

### Update Workout

#### **Endpoint**  
`PATCH /workouts/updateWorkout/:id`
Requires Authorization Token (Bearer Token).

#### **Request Body**
{
  "name": "Evening Strength Training",
  "duration": "45 mins",
  "status": "pending"
}

### Delete Workout

#### **Endpoint**  
`DELETE /workouts/deleteWorkout/:id`
Requires Authorization Token (Bearer Token).

### Complete Workout Status

#### **Endpoint**  
`PATCH /workouts/completeWorkoutStatus/:id`
Requires Authorization Token (Bearer Token).

---

## Dependencies  
Before using this API, ensure you have Git Bash installed to run this command: 
npm install