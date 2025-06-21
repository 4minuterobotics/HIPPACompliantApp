// /backend/controllers/uploadController.js
import { UserUploads } from '../models/UserUploads.js';
import { pool } from '../config/db.js';

export async function saveUserUploads(req, res) {
	try {
		const { id_front, id_back, court_doc1, court_doc2, court_doc3, court_doc4 } = req.body;
		const userId = req.user._id;

		// MongoDB
		const uploads = await UserUploads.findOneAndUpdate(
			{ user_id: userId },
			{ id_front, id_back, court_doc1, court_doc2, court_doc3, court_doc4, user_id: userId },
			{ upsert: true, new: true }
		);

		// PostgreSQL
		await pool.query(
			`INSERT INTO user_uploads (user_id, id_front, id_back, court_doc1, court_doc2, court_doc3, court_doc4)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			ON CONFLICT (user_id) DO UPDATE SET
			id_front = $2, id_back = $3, court_doc1 = $4,
			court_doc2 = $5, court_doc3 = $6, court_doc4 = $7`,
			[req.user.pg_id || null, id_front, id_back, court_doc1, court_doc2, court_doc3, court_doc4]
		);

		res.status(200).json({ success: true, uploads });
	} catch (err) {
		console.error('Error saving uploads:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
