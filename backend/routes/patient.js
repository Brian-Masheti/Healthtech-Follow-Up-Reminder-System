import express from 'express';
import { requireRole } from '../middleware/role.js';
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getMedicalHistory,
  updateMedicalHistory
} from '../controllers/patientController.js';

const router = express.Router();

router.get('/', getPatients);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.delete('/:id', requireRole(['admin']), deletePatient);

// Medical history routes
router.get('/:id/medical-history', getMedicalHistory);
router.put('/:id/medical-history', updateMedicalHistory);

export default router;