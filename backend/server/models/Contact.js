import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	phone: { type: String },
	email: { type: String },
	address_1: { type: String },
	address_2: { type: String },
	city: { type: String },
	state: { type: String },
	country: { type: String },
	zip: { type: String },
});

export const Contact = mongoose.model('Contact', contactSchema);
