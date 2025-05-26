import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  dob: String,
  gender: String,
  address: String,
  medicalHistory: [String],
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);