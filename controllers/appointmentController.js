const Appointment = require("../models/appointment");
const User = require("../models/user");

// This function is responsible for creating an appointment
exports.createAppointment = async (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body;

  // Ensure the patient is authenticated and their id is available via req.user.id
  const patient_id = req.user.id; // Get from logged-in token (populated by authMiddleware)

  if (!doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new appointment in the database
    const newAppointment = await Appointment.create({
      patient_id,  // patient_id comes from the logged-in user's token
      doctor_id,
      appointment_date,
      appointment_time,
      status: "pending", // Default status
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

// This function retrieves the appointments for a specific patient
exports.getAppointmentsByPatient = async (req, res) => {
  const { patientId } = req.params;  // This retrieves 'patientId' from the URL

  try {
    // Retrieve appointments for the specified patient and include doctor details
    const appointments = await Appointment.findAll({
      where: { patient_id: patientId },
      include: [{ model: User, as: "doctor", attributes: ["full_name", "role"] }],
    });

    res.json(appointments); // Send back the data in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// Doctor updates appointment status (approve or cancel)
exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params; // Get appointment id from URL
  const { status } = req.body; // Get the new status (approved, canceled, etc.)

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status; // Update the appointment status
    await appointment.save(); // Save changes to the database

    res.json({ message: "Appointment updated", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update appointment" });
  }
};
