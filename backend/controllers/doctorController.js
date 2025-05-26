import Doctor from '../models/Doctor.js';

export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

export const addDoctor = async (req, res, next) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    next(err);
  }
};