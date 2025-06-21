import mongoose from 'mongoose';

const userUploadsSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	id_front: String,
	id_back: String,
	court_doc1: String,
	court_doc2: String,
	court_doc3: String,
	court_doc4: String,
});

export const UserUploads = mongoose.model('UserUploads', userUploadsSchema);
