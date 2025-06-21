import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, unique: true, sparse: true },
	google_oauth_email: { type: String, unique: true, sparse: true },
	facebook_oauth_email: { type: String, unique: true, sparse: true },
	password: { type: String },
	service_chosen: { type: Boolean, default: false },
	birth_day: { type: Number, min: 1, max: 31 },
	birth_month: { type: Number, min: 1, max: 12 },
	birth_year: { type: Number },
	is_admin: { type: Boolean, default: false },
	is_owner: { type: Boolean, default: false },
	is_provider: { type: Boolean, default: false },
	is_student: { type: Boolean, default: true },
	auth_provider: {
		type: String,
		enum: ['local', 'google', 'facebook'],
		default: 'local',
	},
	last_login: { type: Date },
});

export const User = mongoose.model('User', userSchema);
