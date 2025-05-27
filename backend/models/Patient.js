import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordChanged: { type: Boolean, default: false },
  phone: String,
  dob: String,
  gender: String,
  address: String,
  medicalHistory: [String],
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);