import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	prescribed_class: { type: String },
	prescribed_hours: { type: Number },
	completed_hours: { type: Number },
	course_completed: { type: Boolean },
	prescribed_screening: { type: String },
	screening_completed: { type: Boolean },
});

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
