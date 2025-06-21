// /backend/controllers/fieldChangeController.js
import { FieldChangeLog } from '../models/FieldChangeLog.js';
import { pool } from '../config/db.js';

export async function recordFieldChange(req, res) {
	try {
		const { table_name, column_name, old_value, new_value } = req.body;
		const userId = req.user._id;

		// Save to MongoDB
		const change = await FieldChangeLog.create({
			user_id: userId,
			table_name,
			column_name,
			old_value,
			new_value,
		});

		// Mirror to PostgreSQL
		await pool.query(
			`INSERT INTO field_change_log (user_id, table_name, column_name, old_value, new_value)
			VALUES ($1, $2, $3, $4, $5)`,
			[req.user.pg_id || null, table_name, column_name, old_value, new_value]
		);

		res.status(201).json({ success: true, change });
	} catch (err) {
		console.error('Error recording field change:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
