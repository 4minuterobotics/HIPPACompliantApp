import mongoose from 'mongoose';

const singleClassAttendanceSchema = new mongoose.Schema({
	class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SingleClass', required: true },
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	completed: { type: Boolean },
});

singleClassAttendanceSchema.index({ class_id: 1, user_id: 1 }, { unique: true });

export const SingleClassAttendance = mongoose.model('SingleClassAttendance', singleClassAttendanceSchema);
