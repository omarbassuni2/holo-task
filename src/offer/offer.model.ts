import * as mongoose from 'mongoose';
export const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  discount: {
    type: Number,
    required: true,
    min: [1, 'Discount must be at least 1'],
    max: [100, 'Discount cannot exceed 100'],
  },
});

export interface OfferInterface {
  name: string;
  discount: number;
}
