import mongoose from 'mongoose';

const singleClassSchema = new mongoose.Schema({
	class_name: { type: String },
	class_date: { type: Date },
	class_time: { type: String },
	total_attended: { type: Number },
});

export const SingleClass = mongoose.model('SingleClass', singleClassSchema);
