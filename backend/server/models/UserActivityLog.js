import mongoose from 'mongoose';

const userActivityLogSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	action: String,
	metadata: mongoose.Schema.Types.Mixed,
	timestamp: { type: Date, default: Date.now },
});

export const UserActivityLog = mongoose.model('UserActivityLog', userActivityLogSchema);
