const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import the authMiddleware
const appointmentController = require("../controllers/appointmentController");

// Create a new appointment (requires authentication)
router.post("/appointments", authMiddleware, appointmentController.createAppointment);

// Get appointments for a patient (requires authentication)
router.get("/appointments/:patientId", authMiddleware, appointmentController.getAppointmentsByPatient);

// Update appointment status (requires authentication)
router.put("/appointments/:id/status", authMiddleware, appointmentController.updateAppointmentStatus);

module.exports = router;
