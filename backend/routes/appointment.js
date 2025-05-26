import express from 'express';
import { getAppointments, addAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/', getAppointments);
router.post('/', addAppointment);

export default router;
