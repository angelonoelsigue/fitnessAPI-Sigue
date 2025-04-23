const Workout = require('../models/Workout');
const { errorHandler } = require('../auth');

// **Add Workout**
const addWorkout = (req, res) => {
    const { name, duration, status } = req.body;
    const userId = req.user.id;

    console.log("Received request to add workout for user:", userId);

    if (!name || !duration) {
        console.log("Validation Error: Missing name or duration");
        return res.status(400).send({ message: 'Name and duration are required' });
    }

    console.log("Creating new workout:", name);
    const newWorkout = new Workout({ userId, name, duration, status });

    newWorkout.save()
        .then(workout => {
            console.log("Workout added successfully:", workout._id);
            res.status(201).send(workout); // Send full object as response
        })
        .catch(error => {
            console.error("Error adding workout:", error);
            errorHandler(error, req, res);
        });
};

// **Get My Workouts**
const getMyWorkouts = (req, res) => {
    const userId = req.user.id;

    console.log("Fetching workouts for user:", userId);

    Workout.find({ userId })
        .then(workouts => {
            console.log("Retrieved workouts count:", workouts.length);
            res.status(200).send({ workouts });
        })
        .catch(error => {
            console.error("Error fetching workouts:", error);
            errorHandler(error, req, res);
        });
};

// **Update Workout**
const updateWorkout = (req, res) => {
    const workoutId = req.params.id;
    const { name, duration, status } = req.body;

    console.log("Updating workout:", workoutId);

    Workout.findByIdAndUpdate(workoutId, { name, duration, status }, { new: true })
        .then(updatedWorkout => {
            if (!updatedWorkout) {
                console.log("Workout not found:", workoutId);
                return res.status(404).send({ message: 'Workout not found' });
            }

            console.log("Workout updated successfully:", updatedWorkout._id);
            res.status(200).send({ message: 'Workout updated successfully', updatedWorkout: updatedWorkout });
        })
        .catch(error => {
            console.error("Error updating workout:", error);
            errorHandler(error, req, res);
        });
};

// **Delete Workout**
const deleteWorkout = (req, res) => {
    const workoutId = req.params.id;

    console.log("Deleting workout:", workoutId);

    Workout.findByIdAndDelete(workoutId)
        .then(deletedWorkout => {
            if (!deletedWorkout) {
                console.log("Workout not found:", workoutId);
                return res.status(404).send({ message: 'Workout not found' });
            }

            console.log("Workout deleted successfully:", workoutId);
            res.status(200).send({ message: 'Workout deleted successfully' });
        })
        .catch(error => {
            console.error("Error deleting workout:", error);
            errorHandler(error, req, res);
        });
};

// **Complete Workout Status**
const completeWorkoutStatus = (req, res) => {
    const workoutId = req.params.id;

    console.log("Marking workout as completed:", workoutId);

    Workout.findByIdAndUpdate(workoutId, { status: "completed" }, { new: true })
        .then(updatedWorkout => {
            if (!updatedWorkout) {
                console.log("Workout not found:", workoutId);
                return res.status(404).send({ message: "Workout not found" });
            }

            console.log("Workout marked as completed:", updatedWorkout._id);
            res.status(200).send({ message: "Workout status updated successfully", updatedWorkout: updatedWorkout });
        })
        .catch(error => {
            console.error("Error updating workout status:", error);
            errorHandler(error, req, res);
        });
};

module.exports = { addWorkout, getMyWorkouts, updateWorkout, deleteWorkout, completeWorkoutStatus };
