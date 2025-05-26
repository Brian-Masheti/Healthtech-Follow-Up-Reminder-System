import express from 'express';
import { getReminders, addReminder } from '../controllers/reminderController.js';

const router = express.Router();

router.get('/', getReminders);
router.post('/', addReminder);

export default router;
