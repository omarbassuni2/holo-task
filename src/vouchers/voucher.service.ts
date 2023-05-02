import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoucherInterface } from './voucher.model';
import { UserInterface } from '../user/user.model';
@Injectable()
export class VoucherService {
  constructor(
    @InjectModel('Voucher')
    private readonly voucherModel: Model<VoucherInterface>,
    @InjectModel('User')
    private readonly userModel: Model<UserInterface>,
  ) {}

  async createVoucher(voucherDetails: VoucherInterface) {
    //TO-DO: ADD A CHECK IF THE SPECIAL EXISTS IN DB
    try {
      const users = await this.userModel.find({}, { email: 1 });
      const newVouchers = users.map((u) => {
        return {
          assignedCustomerEmail: u.email,
          assignedSpecialOffer: voucherDetails.specialOffer,
          expirationDate: voucherDetails.expirationDate,
        };
      });
      return this.voucherModel.insertMany(newVouchers);
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
  // TO-DO: add use voucher
  async validateVouchers(email: string, voucherCode: string) {
    try {
      const voucher = await this.voucherModel.find({
        assignedCustomerEmail: email,
        assignedSpecialOffer: voucherCode,
        isUsed: false,
      });
      // TO-DO: ADD SPECIAL OFFER
      return 'SPECIAL OFFER DISCOUNT';
    } catch (error) {
      throw new Error(
        "Couldn't validate voucher for this email and code\n" + error,
      );
    }
  }
}
