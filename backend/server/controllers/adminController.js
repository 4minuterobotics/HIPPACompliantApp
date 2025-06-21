import { pool } from '../config/db.js';
import { User } from '../models/User.js';
import { Prescription } from '../models/Prescription.js';
import PDFDocument from 'pdfkit';
import { bookings } from '../data/dummyData.js';

export async function getAllUsers(req, res) {
	try {
		const users = await User.find({}, 'first_name last_name username is_admin').sort({ last_name: 1 });
		res.json(users);
	} catch (err) {
		console.error('Error fetching users:', err);
		res.status(500).json({ error: 'Server error' });
	}
}

export async function getUserById(req, res) {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		const prescription = await Prescription.findOne({ user_id: userId });
		if (!user) return res.status(404).json({ error: 'User not found' });

		res.json({ user, prescription: prescription || null });
	} catch (err) {
		console.error('Error fetching user profile:', err);
		res.status(500).json({ error: 'Server error' });
	}
}

export async function updateUserPrescription(req, res) {
	const userId = req.params.id;
	const { prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed } = req.body;

	try {
		const updated = await Prescription.findOneAndUpdate(
			{ user_id: userId },
			{
				prescribed_class,
				prescribed_hours,
				completed_hours,
				course_completed,
				prescribed_screening,
				screening_completed,
			},
			{ new: true, upsert: true }
		);

		// Mirror to PostgreSQL
		const exists = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);
		if (exists.rows.length > 0) {
			await pool.query(
				`UPDATE prescriptions SET
				prescribed_class = $1,
				prescribed_hours = $2,
				completed_hours = $3,
				course_completed = $4,
				prescribed_screening = $5,
				screening_completed = $6
				WHERE user_id = $7`,
				[prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed, userId]
			);
		} else {
			await pool.query(
				`INSERT INTO prescriptions (
				user_id, prescribed_class, prescribed_hours,
				completed_hours, course_completed,
				prescribed_screening, screening_completed
				) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[userId, prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed]
			);
		}

		res.json({ success: true, updated });
	} catch (err) {
		console.error('Error updating prescription:', err);
		res.status(500).json({ error: 'Server error' });
	}
}

export async function generateUserPDF(req, res) {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		const presc = await Prescription.findOne({ user_id: userId });
		if (!user) return res.status(404).json({ error: 'User not found' });

		const doc = new PDFDocument();
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename="user_${userId}_profile.pdf"`);

		doc.pipe(res);
		doc.fontSize(16).text('User Profile', { underline: true });
		doc.moveDown();
		doc.fontSize(12).text(`Name: ${user.first_name} ${user.last_name}`);
		doc.text(`Username: ${user.username}`);
		doc.text(`Course: ${presc?.prescribed_class || 'N/A'}`);
		doc.text(`Prescribed Hours: ${presc?.prescribed_hours || 0}`);
		doc.text(`Completed Hours: ${presc?.completed_hours || 0}`);
		doc.text(`Course Completed: ${presc?.course_completed ? 'Yes' : 'No'}`);
		doc.text(`Prescribed Screening: ${presc?.prescribed_screening || 'N/A'}`);
		doc.text(`Screening Completed: ${presc?.screening_completed ? 'Yes' : 'No'}`);
		doc.end();
	} catch (err) {
		console.error('PDF generation error:', err);
		res.status(500).json({ error: 'Failed to generate PDF' });
	}
}

export function getAdminBookings(req, res) {
	res.json(bookings);
}

///////////////////////////////////////////////////////////////
// // /backend/controllers/adminController.js
// import { pool } from '../config/db.js';
// import { bookings } from '../data/dummyData.js';
// import PDFDocument from 'pdfkit';

// export async function getAllUsers(req, res) {
// 	try {
// 		const result = await pool.query('SELECT id, first_name, last_name, username, is_admin FROM users ORDER BY last_name');
// 		res.json(result.rows);
// 	} catch (err) {
// 		console.error('Error fetching users:', err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// }

// export async function getUserById(req, res) {
// 	const userId = req.params.id;
// 	try {
// 		const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
// 		const prescriptionRes = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);

// 		if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

// 		res.json({
// 			user: userRes.rows[0],
// 			prescription: prescriptionRes.rows[0] || null,
// 		});
// 	} catch (err) {
// 		console.error('Error fetching user profile:', err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// }

// export async function updateUserPrescription(req, res) {
// 	const userId = req.params.id;
// 	const { prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed } = req.body;

// 	try {
// 		const existing = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);

// 		if (existing.rows.length > 0) {
// 			await pool.query(
// 				`UPDATE prescriptions SET
// 					prescribed_class = $1,
// 					prescribed_hours = $2,
// 					completed_hours = $3,
// 					course_completed = $4,
// 					prescribed_screening = $5,
// 					screening_completed = $6
// 				 WHERE user_id = $7`,
// 				[prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed, userId]
// 			);
// 		} else {
// 			await pool.query(
// 				`INSERT INTO prescriptions (
// 					user_id, prescribed_class, prescribed_hours,
// 					completed_hours, course_completed,
// 					prescribed_screening, screening_completed
// 				) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
// 				[userId, prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed]
// 			);
// 		}

// 		res.json({ success: true });
// 	} catch (err) {
// 		console.error('Error updating prescription:', err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// }

// export async function generateUserPDF(req, res) {
// 	const userId = req.params.id;

// 	try {
// 		const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
// 		const prescriptionRes = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);

// 		if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

// 		const user = userRes.rows[0];
// 		const presc = prescriptionRes.rows[0] || {};

// 		const doc = new PDFDocument();
// 		res.setHeader('Content-Type', 'application/pdf');
// 		res.setHeader('Content-Disposition', `attachment; filename="user_${userId}_profile.pdf"`);

// 		doc.pipe(res);
// 		doc.fontSize(16).text(`User Profile`, { underline: true }).moveDown();
// 		doc.fontSize(12).text(`Name: ${user.first_name} ${user.last_name}`);
// 		doc.text(`Username: ${user.username}`);
// 		doc.text(`Course: ${presc.prescribed_class || 'N/A'}`);
// 		doc.text(`Prescribed Hours: ${presc.prescribed_hours || 0}`);
// 		doc.text(`Completed Hours: ${presc.completed_hours || 0}`);
// 		doc.text(`Course Completed: ${presc.course_completed ? 'Yes' : 'No'}`);
// 		doc.text(`Prescribed Screening: ${presc.prescribed_screening || 'N/A'}`);
// 		doc.text(`Screening Completed: ${presc.screening_completed ? 'Yes' : 'No'}`);
// 		doc.end();
// 	} catch (err) {
// 		console.error('PDF generation error:', err);
// 		res.status(500).json({ error: 'Failed to generate PDF' });
// 	}
// }

// export function getAdminBookings(req, res) {
// 	res.json(bookings);
// }
