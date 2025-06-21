import mongoose from 'mongoose';

const serviceRegistrantSchema = new mongoose.Schema({
	service_name: { type: String },
	service_description: { type: String },
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const ServiceRegistrant = mongoose.model('ServiceRegistrant', serviceRegistrantSchema);
