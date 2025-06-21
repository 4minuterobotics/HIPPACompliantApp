import mongoose from 'mongoose';

const classAttendanceSchema = new mongoose.Schema({
	class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AllClass', required: true },
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

classAttendanceSchema.index({ class_id: 1, user_id: 1 }, { unique: true });

export const ClassAttendance = mongoose.model('ClassAttendance', classAttendanceSchema);
