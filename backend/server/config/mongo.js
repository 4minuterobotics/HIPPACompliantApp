// /backend/config/mongo.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connectMongo = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('✅ Connected to MongoDB');
	} catch (error) {
		console.error('❌ MongoDB connection failed:', error);
		process.exit(1);
	}
};

export default connectMongo;
