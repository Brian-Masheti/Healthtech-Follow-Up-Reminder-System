import Reminder from '../models/Reminder.js';

// Get all reminders
export const getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    next(err);
  }
};

// Add a new reminder
export const addReminder = async (req, res, next) => {
  try {
    const { patient, message, channel, time } = req.body;
    const reminder = new Reminder({ patient, message, channel, time });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    next(err);
  }
};
