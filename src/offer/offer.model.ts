import * as mongoose from 'mongoose';
export const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
});

export interface OfferInterface {
  name: string;
  discount: number;
}
