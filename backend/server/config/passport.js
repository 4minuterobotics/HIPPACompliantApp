// ✅ FILE: config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from './db.js';
import { User } from '../models/User.js';

// passport.use(
// 	'google',
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.CLIENT_ID,
// 			clientSecret: process.env.CLIENT_SECRET,
// 			callbackURL: 'http://localhost:3000/api/auth/google/callback',
// 		},
// 		async (accessToken, refreshToken, profile, cb) => {
// 			try {
// 				const email = profile.emails[0].value;
// 				const name = profile.displayName;
// 				const googleId = profile.id;

// 				const result = await pool.query('SELECT * FROM users WHERE google_oauth_email = $1', [email]);
// 				let user;

// 				if (result.rows.length === 0) {
// 					const insertResult = await pool.query(
// 						`INSERT INTO users (first_name, google_oauth_email, is_admin, auth_provider, last_login)
// 						 VALUES ($1, $2, $3, $4, NOW())
// 						 RETURNING id, google_oauth_email, is_admin`,
// 						[name, email, false, 'google']
// 					);
// 					user = insertResult.rows[0];
// 				} else {
// 					user = result.rows[0];
// 					await pool.query('UPDATE users SET last_login = NOW(), auth_provider = $1 WHERE id = $2', ['google', user.id]);
// 				}

// 				user.email = email;
// 				const prescriptionResult = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [user.id]);
// 				user.prescriptions = prescriptionResult.rows.length > 0 ? prescriptionResult.rows[0] : null;

// 				cb(null, user);
// 			} catch (err) {
// 				console.error('Error in Google OAuth strategy:', err);
// 				await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [null, 'unknown', false]);
// 				cb(err, null);
// 			}
// 		}
// 	)
// );

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
				const firstName = profile.name.givenName || 'Google';
				const lastName = profile.name.familyName || 'User';
				const googleId = profile.id;

				// 🔍 Mongo: Check for existing user
				let mongoUser = await User.findOne({ google_oauth_email: email });

				if (!mongoUser) {
					// 🆕 Mongo: Create new user
					mongoUser = await User.create({
						first_name: firstName,
						last_name: lastName,
						username: `google_${googleId}`,
						google_oauth_email: email,
						auth_provider: 'google',
						last_login: new Date(),
					});
				} else {
					// 📝 Mongo: Update last_login
					await User.updateOne({ _id: mongoUser._id }, { last_login: new Date() });
				}

				// ✅ Postgres
				const result = await pool.query('SELECT * FROM users WHERE google_oauth_email = $1', [email]);
				let user;
				if (result.rows.length === 0) {
					const insertResult = await pool.query(
						`INSERT INTO users (first_name, last_name, username, google_oauth_email, is_admin, auth_provider, last_login)
						 VALUES ($1, $2, $3, $4, $5, $6, NOW())
						 RETURNING id, google_oauth_email, is_admin`,
						[firstName, lastName, `google_${googleId}`, email, false, 'google']
					);
					user = insertResult.rows[0];
				} else {
					user = result.rows[0];
					await pool.query('UPDATE users SET last_login = NOW(), auth_provider = $1 WHERE id = $2', ['google', user.id]);
				}

				user.email = email;

				const prescriptionResult = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [user.id]);
				user.prescriptions = prescriptionResult.rows.length > 0 ? prescriptionResult.rows[0] : null;

				cb(null, user);
			} catch (err) {
				console.error('Error in Google OAuth strategy:', err);
				await pool.query('INSERT INTO login_attempts (user_id, ip_address, success) VALUES ($1, $2, $3)', [null, 'unknown', false]);
				cb(err, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
		if (result.rows.length === 0) return done(null, false);
		done(null, result.rows[0]);
	} catch (err) {
		done(err);
	}
});

// Export passport to use in server.js or index.js
export default passport;
