import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const pool = new Pool({
	user: process.env.USERR,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: process.env.PORT,
});
