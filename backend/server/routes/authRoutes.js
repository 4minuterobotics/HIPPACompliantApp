// /backend/routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import { loginHandler, registerHandler, currentUserHandler, logoutHandler, googleCallbackHandler } from '../controllers/authController.js';
import { registrationValidation } from '../utils/validators.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Local Registration
router.post('/register', registrationValidation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg);
		return res.status(400).json({ success: false, errors: errorMessages });
	}
	await registerHandler(req, res);
});

// Local Login
router.post('/login', loginHandler);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), googleCallbackHandler);

// Get current session user
router.get('/current-user', currentUserHandler);

// Logout
router.post('/logout', logoutHandler);

export default router;

////////////////////////////////////////////////////////////

// // routes/auth.js
// import express from 'express';
// import passport from 'passport';
// import bcrypt from 'bcrypt';
// import { body, validationResult } from 'express-validator';
// import pool from '../config/db.js';

// const router = express.Router();
// // POST /api/register
// router.post(
// 	'/register',
// 	[
// 		body('firstName').trim().escape().notEmpty().withMessage('First name is required'),
// 		body('lastName').trim().escape().notEmpty().withMessage('Last name is required'),
// 		body('userName').trim().escape().notEmpty().isAlphanumeric().isLength({ min: 1, max: 50 }),
// 		body('password').notEmpty().isLength({ min: 1 }),
// 		body('phone')
// 			.notEmpty()
// 			.matches(/^[0-9]{10}$/),
// 		body('birthMonth').notEmpty().isInt({ min: 1, max: 12 }),
// 		body('birthDay').notEmpty().isInt({ min: 1, max: 31 }),
// 		body('birthYear').notEmpty().isInt({ min: 1900, max: new Date().getFullYear() }),
// 		body('address').trim().escape().notEmpty().isLength({ max: 100 }),
// 		body('city').trim().escape().notEmpty().isAlpha('en-US', { ignore: ' ' }),
// 		body('state').trim().isLength({ min: 2, max: 2 }),
// 		body('zip').trim().notEmpty().isPostalCode('US'),
// 	],
// 	async (req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(400).json({ success: false, errors: errors.array().map((e) => e.msg) });
// 		}

// 		const { firstName, lastName, userName, password, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip } = req.body;

// 		try {
// 			const existing = await pool.query('SELECT 1 FROM users WHERE username = $1', [userName]);
// 			if (existing.rows.length > 0) {
// 				return res.status(400).json({ success: false, message: 'Username already taken' });
// 			}

// 			const hashedPassword = await bcrypt.hash(password, 10);

// 			const result = await pool.query(
// 				`INSERT INTO users (first_name, last_name, username, password, phone, birth_month, birth_day, birth_year,
//             address, address2, city, state, zip, auth_provider, last_login)
//            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'local',NOW()) RETURNING id`,
// 				[firstName, lastName, userName, hashedPassword, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip]
// 			);

// 			res.status(201).json({ success: true, userId: result.rows[0].id });
// 		} catch (err) {
// 			console.error('Registration error:', err);
// 			res.status(500).json({ success: false, message: 'Internal server error' });
// 		}
// 	}
// );

// // POST /api/login
// router.post('/login', async (req, res, next) => {
// 	const { firstName, password } = req.body;
// 	try {
// 		const result = await pool.query('SELECT * FROM users WHERE first_name = $1', [firstName]);
// 		if (result.rows.length === 0) return res.status(401).json({ success: false, message: 'User not found' });

// 		const user = result.rows[0];
// 		const match = await bcrypt.compare(password, user.password);
// 		if (!match) return res.status(401).json({ success: false, message: 'Incorrect password' });

// 		req.login(user, (err) => {
// 			if (err) return next(err);
// 			res.json({ success: true, redirect: user.is_admin ? 'admin' : 'regularUser' });
// 		});
// 	} catch (err) {
// 		console.error('Login error:', err);
// 		res.status(500).json({ success: false, message: 'Internal error' });
// 	}
// });

// // GET /api/current-user
// router.get('/current-user', (req, res) => {
// 	if (req.isAuthenticated()) {
// 		return res.json(req.user);
// 	}
// 	return res.status(401).json({ error: 'Not logged in' });
// });

// // POST /api/logout
// router.post('/logout', (req, res) => {
// 	req.logout((err) => {
// 		if (err) return res.status(500).json({ error: 'Logout error' });
// 		req.session.destroy(() => {
// 			res.clearCookie('connect.sid');
// 			res.json({ success: true });
// 		});
// 	});
// });

// // Google OAuth Routes
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get(
// 	'/auth/google/callback',
// 	passport.authenticate('google', {
// 		failureRedirect: 'http://localhost:5173/login',
// 	}),
// 	(req, res) => {
// 		const redirectPath = req.user.is_admin ? '/admin' : `/studentHome/${req.user.id}`;
// 		res.redirect(`http://localhost:5173${redirectPath}`);
// 	}
// );

// export default router;
