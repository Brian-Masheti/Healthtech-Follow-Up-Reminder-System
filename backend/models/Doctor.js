import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordChanged: { type: Boolean, default: false },
  phone: String,
  specialization: String,
  department: String,
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);