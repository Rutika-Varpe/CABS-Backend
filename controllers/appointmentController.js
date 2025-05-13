const Appointment = require("../models/appointment");
const User = require("../models/user");

exports.createAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

  if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAppointment = await Appointment.create({
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      status: "pending",
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

// Get appointments for a patient
exports.getAppointmentsByPatient = async (req, res) => {
  const { patientId } = req.params;  // This retrieves 'patientId' from the URL
  try {
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


// Doctor updates appointment status
exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Appointment updated", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update appointment" });
  }
};
