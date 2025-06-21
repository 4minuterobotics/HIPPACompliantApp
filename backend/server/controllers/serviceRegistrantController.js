// /backend/controllers/serviceRegistrantController.js
import { ServiceRegistrant } from '../models/ServiceRegistrant.js';
import { pool } from '../config/db.js';

export async function registerService(req, res) {
	try {
		const { service_name, service_description } = req.body;
		const userId = req.user._id;

		// MongoDB
		const registration = await ServiceRegistrant.create({
			user_id: userId,
			service_name,
			service_description,
		});

		// PostgreSQL
		await pool.query(
			`INSERT INTO service_registrants (service_name, service_description, user_id)
			VALUES ($1, $2, $3)`,
			[service_name, service_description, req.user.pg_id || null]
		);

		res.status(201).json({ success: true, registration });
	} catch (err) {
		console.error('Error registering service:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
