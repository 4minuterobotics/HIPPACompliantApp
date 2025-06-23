// /routes/ownerRoutes.js
import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/ownerController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();
