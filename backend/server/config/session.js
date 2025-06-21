import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { pool } from './db.js';

const pgSessionStore = pgSession(session);

export default session({
	store: new pgSessionStore({ pool, tableName: 'session' }),
	name: 'connect.sid',
	secret: 'TopSecretWord',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 20 * 60 * 1000, //20 minutes
		secure: false,
		sameSite: 'lax',
	},
});
