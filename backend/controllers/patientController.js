import Patient from '../models/Patient.js';

// Get all patients
export const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

// Add new patient
export const addPatient = async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

// Update patient
export const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

// Delete patient
export const deletePatient = async (req, res, next) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    next(err);
  }
};