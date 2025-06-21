// /backend/controllers/authController.js
import bcrypt from 'bcrypt';
import { pool } from '../config/db.js';
import { User } from '../models/User.js';
import { LoginAttempt } from '../models/LoginAttempt.js';

export async function registerHandler(req, res) {
	const { firstName, lastName, userName, password, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip } = req.body;

	try {
		const existing = await User.findOne({ username: userName });
		if (existing) {
			return res.status(400).json({ success: false, message: 'Username already taken.' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const mongoUser = await User.create({
			first_name: firstName,
			last_name: lastName,
			username: userName,
			password: hashedPassword,
			phone,
			birth_month: birthMonth,
			birth_day: birthDay,
			birth_year: birthYear,
			address: address + (address2 ? ' ' + address2 : ''),
			city,
			state,
			zip,
			auth_provider: 'local',
			last_login: new Date(),
		});

		await pool.query(
			`INSERT INTO users (
				first_name, last_name, username, password, phone,
				birth_month, birth_day, birth_year, address, address2,
				city, state, zip, auth_provider, last_login
			 ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW())`,
			[firstName, lastName, userName, hashedPassword, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip, 'local']
		);

		res.status(201).json({ success: true, userId: mongoUser._id });
	} catch (err) {
		console.error('Registration error:', err);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

export async function loginHandler(req, res) {
	const { firstName, password } = req.body;

	try {
		const user = await User.findOne({ first_name: firstName });
		if (!user) {
			await LoginAttempt.create({ user_id: null, ip_address: req.ip, success: false });
			return res.status(401).json({ success: false, message: 'User not found' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		await User.updateOne({ _id: user._id }, { last_login: new Date(), auth_provider: 'local' });
		await LoginAttempt.create({ user_id: user._id, ip_address: req.ip, success: passwordMatch });
		await pool.query('UPDATE users SET last_login = NOW(), auth_provider = $1 WHERE username = $2', ['local', user.username]);

		if (!passwordMatch) {
			return res.status(401).json({ success: false, message: 'Incorrect password' });
		}

		req.login(user, (err) => {
			if (err) {
				console.error('Passport login error:', err);
				return res.status(500).json({ success: false, message: 'Session login failed' });
			}

			const redirect = user.is_admin ? 'admin' : 'regularUser';
			return res.status(200).json({ success: true, redirect, message: 'Login successful' });
		});
	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
}

export async function googleCallbackHandler(req, res) {
	try {
		const user = req.user;
		const email = user.email || user.google_oauth_email;
		if (!email) {
			return res.redirect('http://localhost:5173/login?error=noEmail');
		}

		const dbUser = await User.findOne({ google_oauth_email: email });
		if (!dbUser) {
			return res.redirect('http://localhost:5173/login?error=userNotFound');
		}

		const redirectUrl = dbUser.is_admin ? 'http://localhost:5173/admin' : `http://localhost:5173/studentHome/${dbUser._id}`;

		setTimeout(() => res.redirect(redirectUrl), 500);
	} catch (err) {
		console.error('OAuth callback exception:', err);
		res.redirect('http://localhost:5173/login?error=callbackException');
	}
}

export function currentUserHandler(req, res) {
	if (req.isAuthenticated()) {
		return res.json(req.user);
	}
	return res.status(401).json({ error: 'Not logged in' });
}

export function logoutHandler(req, res) {
	req.logout((err) => {
		if (err) {
			console.error('Logout error:', err);
			return res.status(500).json({ error: 'Logout failed' });
		}
		req.session.destroy(() => {
			res.clearCookie('connect.sid');
			res.json({ success: true });
		});
	});
}

////////////////////////////////////////////////////////////////////////////////
// // /backend/controllers/authController.js
// import bcrypt from 'bcrypt';
// import { pool } from '../config/db.js';

// export async function registerHandler(req, res) {
// 	const { firstName, lastName, userName, password, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip } = req.body;

// 	try {
// 		const nameCheck = await pool.query('SELECT * FROM users WHERE first_name = $1', [firstName]);
// 		if (nameCheck.rows.length > 0) {
// 			return res.status(400).json({ success: false, message: 'First name already exists. Try logging in.' });
// 		}

// 		const usernameCheck = await pool.query('SELECT * FROM users WHERE username = $1', [userName]);
// 		if (usernameCheck.rows.length > 0) {
// 			return res.status(400).json({ success: false, message: 'Username already taken. Please use another.' });
// 		}

// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		const query = `
// 		INSERT INTO users (
// 			first_name,
// 			last_name,
// 			username,
// 			password,
// 			phone,
// 			birth_month,
// 			birth_day,
// 			birth_year,
// 			address,
// 			address2,
// 			city,
// 			state,
// 			zip,
// 			auth_provider,
// 			last_login
// 		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
// 		RETURNING id
// 		`;
// 		const values = [firstName, lastName, userName, hashedPassword, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip, 'local'];
// 		const result = await pool.query(query, values);

// 		res.status(201).json({ success: true, userId: result.rows[0].id });
// 	} catch (err) {
// 		console.error('Error registering user:', err);
// 		res.status(500).json({ success: false, message: 'Internal server error' });
// 	}
// }

// export async function loginHandler(req, res) {
// 	const { firstName, password } = req.body;

// 	try {
// 		const result = await pool.query('SELECT * FROM users WHERE first_name = $1', [firstName]);
// 		if (result.rows.length === 0) {
// 			await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [null, req.ip, false]);
// 			return res.status(401).json({ success: false, message: 'User not found' });
// 		}

// 		const user = result.rows[0];
// 		const passwordMatch = await bcrypt.compare(password, user.password);
// 		await pool.query('UPDATE users SET last_login = NOW(), auth_provider = $1 WHERE id = $2', ['local', user.id]);
// 		await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [user.id, req.ip, passwordMatch]);

// 		if (!passwordMatch) {
// 			return res.status(401).json({ success: false, message: 'Incorrect password' });
// 		}

// 		req.login(user, async (err) => {
// 			if (err) {
// 				console.error('Passport login error:', err);
// 				return res.status(500).json({ success: false, message: 'Session login failed' });
// 			}

// 			const redirect = user.is_admin ? 'admin' : 'regularUser';
// 			return res.status(200).json({ success: true, redirect, message: 'Login successful' });
// 		});
// 	} catch (err) {
// 		console.error('Login error:', err);
// 		res.status(500).json({ success: false, message: 'Internal server error' });
// 	}
// }

// export async function googleCallbackHandler(req, res) {
// 	try {
// 		const user = req.user;
// 		const email = user.email || user.google_oauth_email;
// 		if (!email) {
// 			return res.redirect('http://localhost:5173/login?error=noEmail');
// 		}

// 		const dbResult = await pool.query('SELECT id, is_admin FROM users WHERE google_oauth_email = $1', [email]);
// 		const dbUser = dbResult.rows[0];

// 		if (!dbUser) {
// 			return res.redirect('http://localhost:5173/login?error=userNotFound');
// 		}

// 		await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [dbUser.id, req.ip, true]);

// 		const redirectUrl = dbUser.is_admin ? 'http://localhost:5173/admin' : `http://localhost:5173/studentHome/${dbUser.id}`;

// 		setTimeout(() => res.redirect(redirectUrl), 500);
// 	} catch (err) {
// 		console.error('OAuth callback exception:', err);
// 		res.redirect('http://localhost:5173/login?error=callbackException');
// 	}
// }

// export function currentUserHandler(req, res) {
// 	if (req.isAuthenticated()) {
// 		return res.json(req.user);
// 	}
// 	return res.status(401).json({ error: 'Not logged in' });
// }

// export function logoutHandler(req, res) {
// 	req.logout((err) => {
// 		if (err) {
// 			console.error('Logout error:', err);
// 			return res.status(500).json({ error: 'Logout failed' });
// 		}
// 		req.session.destroy(() => {
// 			res.clearCookie('connect.sid');
// 			res.json({ success: true });
// 		});
// 	});
// }
