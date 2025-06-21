import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import sessionMiddleware from './config/session.js';
import { pool } from './config/db.js';
import './config/passport.js';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
// import ownerRoutes from './routes/ownerRoutes.js';
// import providerRoutes from './routes/providerRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';

import connectMongo from './config/mongo.js';
import { sanitize } from './middlewares/sanitize.js';

dotenv.config({ path: '../.env' });
const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitize);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV !== 'development') {
	app.use(morgan('combined'));
}

// Routes
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/provider', providerRoutes);
// app.use('/api/owner', ownerRoutes);
app.use('/api/student', studentRoutes);
app.use('/', stripeRoutes); // Stripe doesn't use /api

// Mongo database
await connectMongo(); // before app.listen()

// Server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
