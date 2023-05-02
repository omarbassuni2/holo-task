import * as mongoose from 'mongoose';

export const VoucherSchema = new mongoose.Schema({
  assignedCustomer: { type: String, required: true },
  assignedSpecialOffer: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  isUsed: { type: Boolean, default: false },
  usedAt: { type: Date, default: null },
});

export interface VoucherInterface {
  email: string;
  specialOffer: string;
  expirationDate: Date;
}
