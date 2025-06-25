import { User } from '../models/User.js';
import { pool } from '../config/db.js';
import { Prescription } from '../models/Prescription.js';

/**
 * GET /api/owner/users
 * Only return users with is_admin, is_owner, or is_provider true (and not is_student)
 */
export async function getAllUsers(req, res) {
	console.log('Fetching all users with admin/owner/provider roles');

	try {
		// Only show users with admin/owner/provider roles, and not students
		const users = await User.find({
			$or: [{ is_admin: true }, { is_owner: true }, { is_provider: true }],
			is_student: { $ne: true },
		});
		console.log('Fetched users:', users.length);
		res.json(users);
	} catch (err) {
		console.log('Error fetching users:', err);
		res.status(500).json({ error: 'Failed to fetch users', details: err.message });
	}
}

/**
 * POST /api/owner/users/:id/roles
 * Update user roles for an existing user only.
 * Only update roles, don't create new users.
 * When updating Postgres, match by email or google_oauth_email.
 */
export async function updateUserRoles(req, res) {
	const { id } = req.params;
	const { roles, newRole } = req.body; // roles: { is_admin: true, ... }, newRole: 'is_something'

	// Find the user in MongoDB
	let mongoUser = await User.findById(id);
	if (!mongoUser) {
		return res.status(404).json({ success: false, message: 'Mongo user not found. No updates made.' });
	}

	// Prevent role changes if the user is a student
	if (mongoUser.is_student) {
		return res.status(403).json({ success: false, message: 'Cannot change roles for students.' });
	}

	// Optionally add a new role (MongoDB adds dynamic fields easily)
	if (newRole && !(newRole in mongoUser)) {
		mongoUser[newRole] = false;
	}

	// Update specified roles
	if (roles && typeof roles === 'object') {
		Object.entries(roles).forEach(([role, value]) => {
			mongoUser[role] = value;
		});
	}
	await mongoUser.save();

	// POSTGRES: Find by email or google_oauth_email
	const email = mongoUser.email || mongoUser.google_oauth_email;
	if (!email) {
		return res.status(400).json({ success: false, message: 'Mongo user has no email/Google email to match in Postgres.' });
	}

	// Try to find the user in Postgres
	const { rows: pgUsers } = await pool.query(`SELECT * FROM users WHERE email = $1 OR google_oauth_email = $1 LIMIT 1`, [email]);
	if (pgUsers.length === 0) {
		return res.status(404).json({ success: false, message: 'Postgres user not found. No updates made.' });
	}
	const pgUser = pgUsers[0];

	// Prepare SQL for updating roles
	let sql = 'UPDATE users SET ';
	const updates = [];
	const values = [];
	let idx = 1;
	if (roles && typeof roles === 'object') {
		for (const [role, value] of Object.entries(roles)) {
			updates.push(`${role} = $${idx++}`);
			values.push(value);
		}
	}
	// Add new role if requested
	if (newRole && !(newRole in pgUser)) {
		updates.push(`${newRole} = $${idx++}`);
		values.push(false);
	}
	if (updates.length === 0) {
		return res.status(400).json({ success: false, message: 'No role changes requested.' });
	}

	sql += updates.join(', ') + ' WHERE id = $' + idx;
	values.push(pgUser.id);

	try {
		await pool.query(sql, values);
		return res.json({ success: true, message: 'Roles updated for user.' });
	} catch (err) {
		return res.status(500).json({ success: false, message: 'Database update failed.', details: err.message });
	}
}

export async function getOwnerProfile(req, res) {
	console.log('Fetching student profile for user ID:', req.params.ownerId);
	const userId = req.params.ownerId;
	try {
		console.log('User ID:', userId);
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: 'User not found' });
		// Replace prescription below with prescriptions filled by the owner.
		console.log('replace prescription below with prescriptions filled by the owner.');
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
