import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  notes: { type: String },
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
export default Client;
