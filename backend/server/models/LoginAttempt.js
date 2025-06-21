import mongoose from 'mongoose';

const loginAttemptSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	ip_address: { type: String },
	success: { type: Boolean },
	timestamp: { type: Date, default: Date.now },
});

export const LoginAttempt = mongoose.model('LoginAttempt', loginAttemptSchema);
