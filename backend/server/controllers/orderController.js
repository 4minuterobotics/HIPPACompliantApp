// /backend/controllers/orderController.js
import { Order } from '../models/Order.js';
import { pool } from '../config/db.js';

export async function createOrder(req, res) {
	try {
		const { amount, date, time, product } = req.body;
		const userId = req.user._id;

		// Write to MongoDB
		const newOrder = await Order.create({
			amount,
			date,
			time,
			product,
			user_id: userId,
		});

		// Mirror to PostgreSQL
		await pool.query(
			`INSERT INTO orders (amount, date, time, product, user_id)
			VALUES ($1, $2, $3, $4, $5)`,
			[amount, date, time, product, req.user.pg_id || null]
		);

		res.status(201).json({ success: true, order: newOrder });
	} catch (err) {
		console.error('Error creating order:', err);
		res.status(500).json({ success: false, message: 'Server error' });
	}
}
