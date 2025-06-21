// /backend/routes/adminRoutes.js
import express from 'express';
import { ensureAdmin } from '../middlewares/auth.js';
import { getAllUsers, getUserById, updateUserPrescription, generateUserPDF, getAdminBookings } from '../controllers/adminController.js';

const router = express.Router();

router.get('/admin/users', ensureAdmin, getAllUsers);
router.get('/admin/users/:id', ensureAdmin, getUserById);
router.post('/admin/users/:id/update', ensureAdmin, updateUserPrescription);
router.get('/admin/users/:id/generate-pdf', ensureAdmin, generateUserPDF);
router.get('/bookings', ensureAdmin, getAdminBookings);

export default router;
