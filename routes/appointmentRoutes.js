const express = require("express");
const router = express.Router();
const {
  getAppointmentsByPatient,
  updateAppointmentStatus,
  createAppointment
} = require("../controllers/appointmentController");

// Get all appointments for a patient
router.post("/", createAppointment); 
router.get("/patient/:patientId", getAppointmentsByPatient);

// Update appointment status (doctor)
router.put("/:id/status", updateAppointmentStatus);

module.exports = router;
