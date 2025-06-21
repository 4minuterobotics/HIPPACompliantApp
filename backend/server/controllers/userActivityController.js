// /backend/controllers/userActivityController.js
import { UserActivityLog } from '../models/UserActivityLog.js';
import { pool } from '../config/db.js';

export async function logUserAction(req, res) {
	try {
		const { action, metadata } = req.body;
		const userId = req.user._id;

		// Save to MongoDB
		const mongoLog = await UserActivityLog.create({
			user_id: userId,
			action,
			metadata,
		});

		// Mirror to PostgreSQL
		await pool.query(
			`INSERT INTO user_activity_log (user_id, action, metadata)
			VALUES ($1, $2, $3)`,
			[req.user.pg_id || null, action, metadata]
		);

		res.status(201).json({ success: true, log: mongoLog });
	} catch (err) {
		console.error('Error logging activity:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
