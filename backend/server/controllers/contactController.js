// /backend/controllers/contactController.js
import { Contact } from '../models/Contact.js';
import { pool } from '../config/db.js';

export async function saveContactInfo(req, res) {
	try {
		const { phone, email, address_1, address_2, city, state, country, zip } = req.body;
		const userId = req.user._id;

		// MongoDB
		const contact = await Contact.findOneAndUpdate({ user_id: userId }, { phone, email, address_1, address_2, city, state, country, zip }, { upsert: true, new: true });

		// PostgreSQL
		await pool.query(
			`INSERT INTO contact (user_id, phone, email, address_1, address_2, city, state, country, zip)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
			ON CONFLICT (user_id) DO UPDATE SET
			phone = $2, email = $3, address_1 = $4, address_2 = $5,
			city = $6, state = $7, country = $8, zip = $9`,
			[req.user.pg_id || null, phone, email, address_1, address_2, city, state, country, zip]
		);

		res.status(200).json({ success: true, contact });
	} catch (err) {
		console.error('Error saving contact info:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
