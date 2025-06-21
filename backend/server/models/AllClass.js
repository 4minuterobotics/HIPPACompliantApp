import mongoose from 'mongoose';

const allClassSchema = new mongoose.Schema({
	class_name: { type: String },
	total_attendees: { type: Number },
	instructor_name: { type: String },
});

export const AllClass = mongoose.model('AllClass', allClassSchema);
