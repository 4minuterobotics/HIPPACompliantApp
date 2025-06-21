// /backend/controllers/classAttendanceController.js
import { ClassAttendance } from '../models/ClassAttendance.js';
import { pool } from '../config/db.js';

export async function markClassAttendance(req, res) {
	try {
		const { class_id } = req.body;
		const userId = req.user._id;

		// MongoDB write
		const attendance = await ClassAttendance.findOneAndUpdate({ class_id, user_id: userId }, { class_id, user_id: userId }, { upsert: true, new: true });

		// PostgreSQL write
		await pool.query(
			`INSERT INTO class_attendance (class_id, user_id)
			VALUES ($1, $2)
			ON CONFLICT DO NOTHING`,
			[class_id, req.user.pg_id || null]
		);

		res.status(200).json({ success: true, attendance });
	} catch (err) {
		console.error('Error marking class attendance:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
