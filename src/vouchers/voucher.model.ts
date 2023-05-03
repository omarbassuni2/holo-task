import * as mongoose from 'mongoose';
import * as validator from 'validator';

export const VoucherSchema = new mongoose.Schema({
  assignedCustomerEmail: {
    type: String,
    required: true,
    validate: [
      validator.isEmail,
      'Email is not valid. Make sure you submitted a valid Email',
    ],
  },
  assignedSpecialOffer: { type: String, required: true },
  expirationDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        return date > new Date();
      },
      message: 'Expiration date must be in the future',
    },
  },
  isUsed: { type: Boolean, default: false },
  usedAt: { type: Date, default: null },
});

export interface VoucherInterface {
  assignedSpecialOffer: string;
  expirationDate: Date;
}
