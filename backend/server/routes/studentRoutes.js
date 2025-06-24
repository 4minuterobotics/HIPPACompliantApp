// /backend/routes/studentRoutes.js
import express from 'express';
import { getStudentProfile } from '../controllers/studentController.js';
import { ensureStudent } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:id', ensureStudent, getStudentProfile);

export default router;
