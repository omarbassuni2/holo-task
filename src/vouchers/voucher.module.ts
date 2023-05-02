import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherSchema } from './voucher.model';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { UserSchema } from '../user/user.model';
import { OfferSchema } from '../offer/offer.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Voucher', schema: VoucherSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Offer', schema: OfferSchema },
    ]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
