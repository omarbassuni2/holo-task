import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoucherInterface } from './voucher.model';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel('Voucher')
    private readonly voucherModel: Model<VoucherInterface>,
  ) {}

  async createVoucher(voucherDetails: VoucherInterface) {
    //TO-DO: ADD A CHECK IF THE EMAIL/SPECIAL EXISTS IN DB
    try {
      const newVoucher = new this.voucherModel({
        assignedCustomerEmail: voucherDetails.email,
        assignedSpecialOffer: voucherDetails.specialOffer,
        expirationDate: voucherDetails.expirationDate,
      });
      const result = await newVoucher.save();
      return result.id as string;
    } catch (error) {
      throw new Error("Couldn't create a voucher \n" + error);
    }
  }

  async getEmailVouchers(email: string) {
    try {
      return this.voucherModel.find({ assignedCustomerEmail: email });
    } catch (error) {
      throw new Error("Couldn't get vouchers for this email\n" + error);
    }
  }
}
