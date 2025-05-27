import Patient from '../models/Patient.js';

// Get a patient's medical history
export const getMedicalHistory = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient.medicalHistory || []);
  } catch (err) {
    next(err);
  }
};

// Update a patient's medical history
export const updateMedicalHistory = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    patient.medicalHistory = req.body.medicalHistory || [];
    await patient.save();
    res.json(patient.medicalHistory);
  } catch (err) {
    next(err);
  }
};

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