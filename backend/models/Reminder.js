import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  message: { type: String, required: true },
  sent: { type: Boolean, default: false },
  channel: { type: String, default: 'SMS' },
  time: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Reminder', reminderSchema);
