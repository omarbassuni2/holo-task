import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherModule } from './vouchers/voucher.module';
import { UserModule } from './user/user.module';
import { OfferModule } from './offer/offer.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://holo:holo123@cluster0.antftjc.mongodb.net/holo-task?retryWrites=true&w=majority',
    ),
    VoucherModule,
    UserModule,
    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
