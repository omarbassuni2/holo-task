import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoucherInterface } from './voucher.model';
import { UserInterface } from '../user/user.model';
import { OfferInterface } from '../offer/offer.model';
@Injectable()
export class VoucherService {
  constructor(
    @InjectModel('Voucher')
    private readonly voucherModel: Model<VoucherInterface>,
    @InjectModel('User')
    private readonly userModel: Model<UserInterface>,
    @InjectModel('Offer')
    private readonly offerModel: Model<OfferInterface>,
  ) {}

  async createVoucher(voucherDetails: VoucherInterface) {
    try {
      const offer = await this.offerModel.find({
        name: voucherDetails.assignedSpecialOffer,
      });
      if (offer.length === 0)
        return {
          status: 'success',
          message: 'No offer with this name was found!',
        };
      const users = await this.userModel.find({}, { email: 1 });
      const newVouchers = users.map((u) => {
        return {
          assignedCustomerEmail: u.email,
          assignedSpecialOffer: voucherDetails.assignedSpecialOffer,
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
  async validateVouchers(email: string, voucherCode: string) {
    try {
      const voucher = await this.voucherModel.find({
        assignedCustomerEmail: email,
        _id: voucherCode,
        isUsed: false,
      });
      if (voucher.length === 0)
        return {
          message:
            'No valid/unused vouchers with this email and code was found',
        };
      if (voucher[0].expirationDate < new Date())
        return { status: 'success', message: 'Voucher expired!' };
      const offer = await this.offerModel.findOne({
        name: voucher[0].assignedSpecialOffer,
      });
      await this.voucherModel.updateOne(
        {
          assignedCustomerEmail: email,
          _id: voucherCode,
          isUsed: false,
        },
        { isUsed: true, usedAt: new Date() },
      );
      return { status: 'success', discount: offer.discount };
    } catch (error) {
      throw new Error(
        "Couldn't validate voucher for this email and code\n" + error,
      );
    }
  }
}
