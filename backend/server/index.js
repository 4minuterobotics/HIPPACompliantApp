import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import express from 'express';
import rateLimit from 'express-rate-limit'; // prevents brute force
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; //will allow local authentication with username/email and password
import pgSession from 'connect-pg-simple';
import cors from 'cors';
import morgan from 'morgan';
import Stripe from 'stripe';
// import bodyParser from 'body-parser';

const app = express();
const port = 3000;
dotenv.config({ path: '../.env' });

//Stripe config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PostgreSQL pool setup
const pool = new Pool({
	user: process.env.USERR,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: process.env.PORT,
});

//middlewares
app.use(
	cors({
		origin: 'http://localhost:5173', // ✅ specific origin, not '*'
		credentials: true, // ✅ allow cookies/sessions
	})
);

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // this give every request a body

app.use(
	session({
		store: new (pgSession(session))({
			pool,
			tableName: 'session',
		}),
		name: 'connect.sid',

		// Secret key used to sign the session ID cookie — keep this secure in production
		secret: 'TopSecretWord',

		// Forces the session to be saved back to the session store, even if it wasn't modified
		// Setting to false is recommended to reduce unnecessary session store operations
		resave: false,

		// Forces a session that is "uninitialized" (new but not modified) to be saved
		// Useful for implementing login sessions, set to true if you're setting cookies before modifying the session
		saveUninitialized: false,
		cookie: {
			// maxAge: 24 * 60 * 60 * 1000, // 1 day
			maxAge: 1 * 20 * 60 * 1000, // 20 min
			secure: false, // change to true in production (HTTPS only)
			sameSite: 'lax', // protects from CSRF; change to 'strict' if needed
		},
	})
);

// Initialize Passport.js middleware
// This sets up Passport to be used in your app for handling authentication
app.use(passport.initialize());

// Use Passport's session handling
// This middleware integrates Passport with Express session support
// It must come AFTER app.use(session(...)) so that Passport can access the session data
app.use(passport.session());

let devMode = true;
let modes = [
	{
		name: 'dev',
		userNameMinimum: 1,
		passwordMinimum: 1,
		phoneMinimum: 1,
	},
	{
		name: 'live',
		userNameMinimum: 6,
		passwordMinimum: 8,
		phoneMinimum: 10,
	},
];
let userNameMinimum;
let passwordMinimum;
let phoneMinimum;

if (devMode) {
	userNameMinimum = modes[0].userNameMinimum;
	passwordMinimum = modes[0].passwordMinimum;
	phoneMinimum = modes[0].phoneMinimum;
} else {
	userNameMinimum = modes[1].userNameMinimum;
	passwordMinimum = modes[1].passwordMinimum;
	phoneMinimum = modes[1].phoneMinimum;
}

if (!devMode) {
	app.use(morgan('combined'));
}

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // (15 minutes)
	max: 5,
	message: 'Too many attempts, try again later.',
});

if (!devMode) {
	app.use('/api/login', authLimiter);
	app.use('/api/register', authLimiter);
}

// Registration route
app.post(
	'/api/register',
	[
		body('firstName').trim().escape().notEmpty().withMessage('First name is required').isAlpha().isLength({ max: 50 }).withMessage('First name must contain only letters'),

		body('lastName').trim().escape().notEmpty().withMessage('Last name is required').isAlpha().isLength({ max: 50 }).withMessage('Last name must contain only letters'),

		body('userName')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('Username is required')
			.isAlphanumeric()
			.withMessage('Username must be alphanumeric')
			.isLength({ min: userNameMinimum, max: 50 })
			.withMessage('Username must be 4-50 characters long'),

		body('password').notEmpty().withMessage('Password is required').isLength({ min: passwordMinimum, max: 255 }).withMessage('Password must be at least 6 characters long'),

		body('phone')
			.notEmpty()
			.withMessage('Phone number is required')
			.matches(/^\d{10}$/)
			.isLength({ max: 20 })
			.withMessage('Phone must be a 10-digit number'),

		body('birthMonth').notEmpty().withMessage('Birth month is required').isInt({ min: 1, max: 12 }).withMessage('Birth month must be 1–12').toInt(),

		body('birthDay').notEmpty().withMessage('Birth day is required').isInt({ min: 1, max: 31 }).withMessage('Birth day must be 1–31').toInt(),

		body('birthYear').notEmpty().withMessage('Birth year is required').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Birth year must be realistic').toInt(),

		body('address').trim().escape().notEmpty().withMessage('Address required').isLength({ max: 100 }).withMessage('Address must be at most 100 characters'),

		body('address2').optional().escape().trim().isLength({ max: 100 }).withMessage('Address 2 must be at most 100 characters'),

		body('city')
			.trim()
			.escape()
			.notEmpty()
			.withMessage('City is required')
			.isLength({ max: 50 })
			.withMessage('City must be at most 50 characters')
			.isAlpha('en-US', { ignore: ' ' })
			.withMessage('City must contain only letters'),

		body('state').trim().notEmpty().withMessage('State is required').isLength({ min: 2, max: 2 }).withMessage('Use 2-letter state code'),

		body('zip')
			.notEmpty()
			.escape()
			.withMessage('ZIP code is required')
			.isPostalCode('US')
			.withMessage('Must be a valid ZIP code')
			.isLength({ max: 10 })
			.withMessage('ZIP code must be at most 10 characters'),
		,
	],
	async (req, res) => {
		// Handle validation results
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg);
			console.log(errorMessages);
			return res.status(400).json({ success: false, errors: errorMessages });
		}
		const { firstName, lastName, userName, password, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip } = req.body;

		try {
			// TEMPORARY: check if first name already exists
			const nameCheck = await pool.query('SELECT * FROM users WHERE first_name = $1', [firstName]);

			if (nameCheck.rows.length > 0) {
				return res.status(400).json({ success: false, message: 'First name already exists. Try logging in. ---- Using first name for now until add email to this check.' });
			}

			// ✅ NEW: Check if username already exists
			const usernameCheck = await pool.query('SELECT * FROM users WHERE username = $1', [userName]);

			if (usernameCheck.rows.length > 0) {
				return res.status(400).json({ success: false, message: 'Username already taken. Please use another.' });
			} else {
				// Hash the password
				const saltRounds = 10;
				const hashedPassword = await bcrypt.hash(password, saltRounds);

				// Insert user into the database
				const query = `
INSERT INTO users (
  first_name,
  last_name,
  username,
  password,
  phone,
  birth_month,
  birth_day,
  birth_year,
  address,
  address2,
  city,
  state,
  zip,
  auth_provider,
  last_login
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 $14, NOW())
RETURNING id
`;
				const values = [firstName, lastName, userName, hashedPassword, phone, birthMonth, birthDay, birthYear, address, address2, city, state, zip, 'local'];

				const result = await pool.query(query, values);
				res.status(201).json({ success: true, userId: result.rows[0].id });
			}
		} catch (err) {
			console.error('Error registering user:', err);
			res.status(500).json({ success: false, message: 'Internal server error' });
		}
	}
);

app.post('/api/login', async (req, res) => {
	const { firstName, password } = req.body;

	try {
		const result = await pool.query('SELECT * FROM users WHERE first_name = $1', [firstName]);
		if (result.rows.length === 0) {
			console.log('user not found');
			await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [null, req.ip, false]);

			return res.status(401).json({ success: false, message: 'User not found' });
		}

		const user = result.rows[0];
		const storedHashedPassword = user.password;

		const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
		await pool.query('UPDATE users SET last_login = NOW(), auth_provider = $1 WHERE id = $2', ['local', user.id]);
		await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [user.id, req.ip, true]);

		if (passwordMatch) {
			req.login(user, async (err) => {
				if (err) {
					console.error('Passport login error:', err);
					return res.status(500).json({ success: false, message: 'Session login failed' });
				}

				await pool.query('UPDATE users SET last_login = NOW(), auth_provider = $1 WHERE id = $2', ['local', user.id]);
				await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [user.id, req.ip, true]);

				if (user.is_admin) {
					return res.status(200).json({ success: true, redirect: 'admin', message: 'Login successful' });
				} else {
					return res.status(200).json({ success: true, redirect: 'regularUser', message: 'Login successful' });
				}
			});
		} else {
			await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [user.id, req.ip, false]);

			console.log('incorrect password');
			return res.status(401).json({ success: false, message: 'Incorrect password' });
		}
	} catch (err) {
		console.error('Login error:', err);
		return res.status(500).json({ success: false, message: 'Internal server error' });
	}
});

passport.use(
	'google',
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/api/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, cb) => {
			try {
				const email = profile.emails[0].value;
				const name = profile.displayName;
				const googleId = profile.id;

				// 🔍 Check if user exists in DB
				const result = await pool.query('SELECT * FROM users WHERE google_oauth_email = $1', [email]);

				let user;

				if (result.rows.length === 0) {
					// 🆕 Insert new user
					const insertResult = await pool.query(
						`INSERT INTO users (first_name, google_oauth_email, is_admin, auth_provider, last_login)
                         VALUES ($1, $2, $3, $4, NOW())
                         RETURNING id, google_oauth_email, is_admin`,
						[name, email, false, 'google']
					);

					user = insertResult.rows[0];
					console.log('✅ New user created via Google:', user);
				} else {
					// ✅ User already exists
					user = result.rows[0];
					console.log('✅ Existing user logged in via Google:', user);
					await pool.query('UPDATE users SET last_login = NOW(), auth_provider = $1 WHERE id = $2', ['google', user.id]);
				}

				user.email = email;

				// 🔍 Fetch Prescription Data
				const prescriptionResult = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [user.id]);

				// Attach prescription data to the user object
				user.prescriptions = prescriptionResult.rows.length > 0 ? prescriptionResult.rows[0] : null;
				console.log('prescriptions: ' + user.prescriptions);
				console.log('serializing user: ', user);

				cb(null, user); // sends user to serializeUser
			} catch (err) {
				console.error('❌ Error in Google OAuth strategy:', err);
				cb(err, null);
				await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [null, 'unknown', false]);
			}
		}
	)
);

passport.serializeUser((user, cb) => {
	cb(null, user.id); // ✅ store only the user ID in the session
});

passport.deserializeUser(async (id, cb) => {
	try {
		const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
		if (result.rows.length === 0) return cb(null, false);
		cb(null, result.rows[0]); // ✅ attach full user object to req.user
	} catch (err) {
		cb(err);
	}
});

app.get(
	'/api/auth/google',
	(req, res, next) => {
		console.log('Starting Google OAuth flow...');
		next();
	},
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), async (req, res, next) => {
	try {
		const user = req.user;

		// ✅ Ensure session is properly established
		req.login(user, async (err) => {
			if (err) {
				console.error('Login session creation failed:', err);
				return res.redirect('http://localhost:5173/login?error=sessionFail');
			}

			const email = user.email || user.google_oauth_email;
			if (!email) {
				return res.redirect('http://localhost:5173/login?error=noEmail');
			}

			try {
				const dbResult = await pool.query('SELECT id, is_admin FROM users WHERE google_oauth_email = $1', [email]);

				const dbUser = dbResult.rows[0];

				if (!dbUser) {
					return res.redirect('http://localhost:5173/login?error=userNotFound');
				}

				// ✅ Optionally log login attempt
				await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [dbUser.id, req.ip, true]);

				if (dbUser.is_admin) {
					setTimeout(() => {
						res.redirect('http://localhost:5173/admin');
					}, 500); // ⏳ delay for session to write
				} else {
					setTimeout(() => {
						res.redirect(`http://localhost:5173/studentHome/${dbUser.id}`);
					}, 500);
				}
			} catch (dbErr) {
				console.error('Database error after Google login:', dbErr);
				return res.redirect('http://localhost:5173/login?error=dbError');
			}
		});
	} catch (err) {
		console.error('OAuth callback exception:', err);
		res.redirect('http://localhost:5173/login?error=callbackException');
	}
});

app.get('/api/current-user', (req, res) => {
	// console.log('🧠 Session content:', req.session);
	// console.log('🙍‍♂️ req.user:', req.user);

	if (req.isAuthenticated()) {
		console.log('🧠 Session content:put session here');
		console.log('🙍‍♂️ req.user: put user here');
		return res.json(req.user);
	} else {
		console.log('not logged in');
		return res.status(401).json({ error: 'Not logged in' });
	}
});

import { bookings, bookings2 } from './data/dummyData.js';
app.get('/api/bookings', ensureAdmin, (req, res) => {
	res.json(bookings); // only admins will reach this
});

function ensureAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user?.is_admin) {
		return next();
	}
	return res.status(403).json({ error: 'Access denied. Admins only.' });
}

function ensureStudents(req, res, next) {
	if (!req.isAuthenticated()) {
		console.log('❌ Access denied: not authenticated');
		return res.status(401).json({ error: 'Not authenticated' });
	}

	const { is_admin, is_owner, is_provider, id } = req.user;

	console.log('🔍 Authenticated user:', { id, is_admin, is_owner, is_provider });

	if (!is_admin && !is_owner && !is_provider) {
		console.log('✅ Access granted: verified as student');
		return next();
	}

	console.log('❌ Access denied: user is not a student');
	return res.status(403).json({ error: 'Access denied. Students only.' });
}

function ensureStudent(req, res, next) {
	console.log('ensure student');
	if (req.isAuthenticated()) {
		console.log('Authenticated user ID:', req.user.id);
		console.log('Requested ID:', req.params.id);

		if (!req.user.is_admin && !req.user.is_owner && !req.user.is_provider && String(req.user.id) === String(req.params.id)) {
			console.log('✅ Access granted');
			return next();
		}
	}

	console.log('❌ Access denied in ensureStudent');
	return res.status(403).json({ error: 'Access denied. Student access only.' });
}
app.post('/api/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			console.error('Logout error:', err);
			return res.status(500).json({ error: 'Logout failed' });
		}
		req.session.destroy(() => {
			res.clearCookie('connect.sid'); // default cookie name
			res.json({ success: true });
		});
	});
});

//stripe integration
// Endpoint to create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
	try {
		console.log('Using Price ID:', process.env.EXAMPLE_8_CLASSES_PRICE_ID);
		const session = await stripe.checkout.sessions.create({
			ui_mode: 'embedded', // use embedded Stripe checkout form
			line_items: [
				{
					// Use a real price ID from your Stripe dashboard
					price: process.env.EXAMPLE_8_CLASSES_PRICE_ID,
					quantity: 1,
				},
			],
			mode: 'payment',
			return_url: `${process.env.FRONT_END_DOMAIN}/checkoutResults?session_id={CHECKOUT_SESSION_ID}`,
			automatic_tax: { enabled: true },
		});

		// Return only the client secret needed by the frontend
		res.send({ clientSecret: session.client_secret });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		res.status(500).send({ error: 'Something went wrong creating the checkout session.' });
	}
});

// Endpoint to retrieve the status of a session
app.get('/session-status', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

		res.send({
			status: session.status,
			customer_email: session.customer_details?.email,
		});
	} catch (error) {
		console.error('Error retrieving session:', error);
		res.status(500).send({ error: 'Failed to retrieve session status.' });
	}
});

// GET /api/admin/users
app.get('/api/admin/users', ensureAdmin, async (req, res) => {
	try {
		const result = await pool.query('SELECT id, first_name, last_name, username, is_admin FROM users ORDER BY last_name');
		res.json(result.rows);
	} catch (err) {
		console.error('Error fetching users:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET /api/admin/users/:id
app.get('/api/admin/users/:id', ensureAdmin, async (req, res) => {
	const userId = req.params.id;
	try {
		const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
		const prescriptionRes = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);

		if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

		res.json({
			user: userRes.rows[0],
			prescription: prescriptionRes.rows[0] || null,
		});
	} catch (err) {
		console.error('Error fetching user profile:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET /api/student/:id
app.get('/api/student/:id', ensureStudent, async (req, res) => {
	const userId = req.params.id;
	console.log('fetching user info');
	try {
		const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
		const prescriptionRes = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);

		if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

		res.json({
			user: userRes.rows[0],
			prescription: prescriptionRes.rows[0] || null,
		});
	} catch (err) {
		console.error('Error fetching user profile:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

// POST /api/admin/users/:id/update
app.post('/api/admin/users/:id/update', ensureAdmin, async (req, res) => {
	const userId = req.params.id;
	const { prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed } = req.body;

	try {
		// Check if prescription exists
		const existing = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);

		if (existing.rows.length > 0) {
			// Update existing
			await pool.query(
				`
		  UPDATE prescriptions SET
			prescribed_class = $1,
			prescribed_hours = $2,
			completed_hours = $3,
			course_completed = $4,
			prescribed_screening = $5,
			screening_completed = $6
		  WHERE user_id = $7
		`,
				[prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed, userId]
			);
		} else {
			// Insert new
			await pool.query(
				`
		  INSERT INTO prescriptions (
			user_id, prescribed_class, prescribed_hours,
			completed_hours, course_completed,
			prescribed_screening, screening_completed
		  ) VALUES ($1, $2, $3, $4, $5, $6, $7)
		`,
				[userId, prescribed_class, prescribed_hours, completed_hours, course_completed, prescribed_screening, screening_completed]
			);
		}

		res.json({ success: true });
	} catch (err) {
		console.error('Error updating prescription:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

// GET /api/admin/users/:id/generate-pdf
import PDFDocument from 'pdfkit';

app.get('/api/admin/users/:id/generate-pdf', ensureAdmin, async (req, res) => {
	const userId = req.params.id;

	try {
		const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
		const prescriptionRes = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);

		if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

		const user = userRes.rows[0];
		const presc = prescriptionRes.rows[0] || {};

		const doc = new PDFDocument();
		res.setHeader('Content-Type', 'application/pdf');
		res.setHeader('Content-Disposition', `attachment; filename="user_${userId}_profile.pdf"`);

		doc.pipe(res);

		doc.fontSize(16).text(`User Profile`, { underline: true });
		doc.moveDown();

		doc.fontSize(12).text(`Name: ${user.first_name} ${user.last_name}`);
		doc.text(`Username: ${user.username}`);
		doc.text(`Course: ${presc.prescribed_class || 'N/A'}`);
		doc.text(`Prescribed Hours: ${presc.prescribed_hours || 0}`);
		doc.text(`Completed Hours: ${presc.completed_hours || 0}`);
		doc.text(`Course Completed: ${presc.course_completed ? 'Yes' : 'No'}`);
		doc.text(`Prescribed Screening: ${presc.prescribed_screening || 'N/A'}`);
		doc.text(`Screening Completed: ${presc.screening_completed ? 'Yes' : 'No'}`);

		doc.end();
	} catch (err) {
		console.error('PDF generation error:', err);
		res.status(500).json({ error: 'Failed to generate PDF' });
	}
});

app.listen(port, () => {
	console.log(`server is running on port  ${port}.`);
});
