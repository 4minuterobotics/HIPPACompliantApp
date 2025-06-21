import mongoose from 'mongoose';

const phiAccessLogSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	patient_id: { type: mongoose.Schema.Types.ObjectId },
	accessed_table: String,
	operation: String,
	timestamp: { type: Date, default: Date.now },
});

export const PhiAccessLog = mongoose.model('PhiAccessLog', phiAccessLogSchema);
