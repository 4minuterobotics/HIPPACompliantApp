import mongoose from 'mongoose';

const fieldChangeLogSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	table_name: String,
	column_name: String,
	old_value: String,
	new_value: String,
	changed_at: { type: Date, default: Date.now },
});

export const FieldChangeLog = mongoose.model('FieldChangeLog', fieldChangeLogSchema);
