import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	amount: { type: Number },
	date: { type: Date },
	time: { type: String },
	product: { type: String },
});

export const Order = mongoose.model('Order', orderSchema);
