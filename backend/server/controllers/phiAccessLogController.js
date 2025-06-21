// /backend/controllers/phiAccessLogController.js
import { PhiAccessLog } from '../models/PhiAccessLog.js';
import { pool } from '../config/db.js';

export async function logPHIAccess(req, res) {
	try {
		const { patient_id, accessed_table, operation } = req.body;
		const userId = req.user._id;

		// MongoDB
		const log = await PhiAccessLog.create({
			user_id: userId,
			patient_id,
			accessed_table,
			operation,
		});

		// PostgreSQL
		await pool.query(
			`INSERT INTO phi_access_log (user_id, patient_id, accessed_table, operation)
			VALUES ($1, $2, $3, $4)`,
			[req.user.pg_id || null, patient_id, accessed_table, operation]
		);

		res.status(201).json({ success: true, log });
	} catch (err) {
		console.error('Error logging PHI access:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
