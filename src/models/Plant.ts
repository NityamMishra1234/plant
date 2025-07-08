import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: String,
  type: String, // "Indoor", "Outdoor", etc.
  description: String,
  price: Number,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema);
export default Plant;
