// import { pool } from '../config/db.js';
import { User } from '../models/User.js';
import { Prescription } from '../models/Prescription.js';

export async function getStudentProfile(req, res) {
	console.log('Fetching student profile for user ID:', req.params.id);
	const userId = req.params.id;
	try {
		console.log('User ID:', userId);
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: 'User not found' });

		const prescription = await Prescription.findOne({ user_id: userId });
		if (!prescription) {
			console.log('No prescription found for user ID:', userId);
		} else {
			console.log('Prescription found:', prescription);
		}
		res.json({ user, prescription: prescription || null });
	} catch (err) {
		console.error('Error fetching user profile:', err);
		res.status(500).json({ error: 'Server error' });
	}
}

// /backend/controllers/studentController.js

// export async function getStudentProfile(req, res) {
// 	const userId = req.params.id;
// 	try {
// 		const user = await User.findById(userId);
// 		if (!user) return res.status(404).json({ error: 'User not found' });

// 		const prescription = await Prescription.findOne({ user_id: userId });
// 		res.json({ user, prescription: prescription || null });
// 	} catch (err) {
// 		console.error('Error fetching user profile:', err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// }
