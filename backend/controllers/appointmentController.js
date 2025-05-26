import Appointment from '../models/Appointment.js';

// Get all appointments
export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

// Add a new appointment
export const addAppointment = async (req, res, next) => {
  try {
    const { patient, date, time, type } = req.body;
    const appointment = new Appointment({ patient, date, time, type });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};
