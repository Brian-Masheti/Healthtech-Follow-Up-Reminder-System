import express from 'express';
import {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAdmins);
router.post('/', addAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;