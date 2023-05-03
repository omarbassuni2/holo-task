import { Test } from '@nestjs/testing';
import { VoucherModule } from '../voucher.module';
import { Connection } from 'mongoose';
import { VoucherService } from '../voucher.service';
import { DatabaseService } from '../../database/database.service';
import { voucherStub } from './stubs/voucher.stub';
import { AppModule } from '../../app.module';
import { VoucherInterface } from '../voucher.model';
import { secondOfferStub } from '../../offer/test/stubs/offer.stub';
import { secondUserStub } from '../../user/test/stubs/user.stub';

describe('VoucherModel', () => {
  let dbConnection: Connection;
  let voucherService: VoucherService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, VoucherModule],
    }).compile();
    voucherService = moduleRef.get<VoucherService>(VoucherService);
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    await dbConnection.collection('offers').insertOne(secondOfferStub());
    await dbConnection.collection('users').insertOne(secondUserStub());
  });
  afterAll(async () => {
    await dbConnection.collection('vouchers').deleteMany({});
    await dbConnection.collection('offers').deleteMany({});
    await dbConnection.collection('users').deleteMany({});
    await dbConnection.close();
  });
  describe('when createVoucher gets called', () => {
    it('then It should create voucher', async () => {
      const result = await voucherService.createVoucher(voucherStub());
      expect(result).toMatchObject([voucherStub()]);
    });
    it("then It should return error creating voucher with an offer that doesn't exist offer", async () => {
      const badVoucherStub: VoucherInterface = {
        assignedSpecialOffer: 'offer99',
        expirationDate: new Date('2024-01-12'),
      };
      const result = await voucherService.createVoucher(badVoucherStub);
      expect(result).toMatchObject({
        message: 'No offer with this name was found!',
        status: 'success',
      });
    });
    it('then It should reject creating voucher that inputs a non-valid date', async () => {
      const badVoucherStub: VoucherInterface = {
        assignedSpecialOffer: 'offer99',
        expirationDate: new Date('2010-01-12'),
      };
      const result = await voucherService.createVoucher(badVoucherStub);
      expect(result).toMatchObject({
        message: 'No offer with this name was found!',
        status: 'success',
      });
    });
  });

  describe('when getEmailVoucher gets called', () => {
    it('then It should return voucher for a certain email in database', async () => {
      const result = await voucherService.getEmailVouchers(
        secondUserStub().email,
      );
      expect(result).toMatchObject([
        { ...voucherStub(), isUsed: false, usedAt: null },
      ]);
    });
    it('then It should throw an error for a non valid email', async () => {
      await expect(
        voucherService.getEmailVouchers('omar1111@gmail.com'),
      ).toMatchObject({});
    });
  });

  describe('when validateVouchers gets called', () => {
    it('then It should validate voucher', async () => {
      const emailVouchers = await voucherService.getEmailVouchers(
        secondUserStub().email,
      );
      const result = await voucherService.validateVouchers(
        secondUserStub().email,
        emailVouchers[0]._id.toString(),
      );
      expect(result).toMatchObject({ status: 'success', discount: 44 });
    });

    it('then It should throw an error because the voucher is validated', async () => {
      const emailVouchers = await voucherService.getEmailVouchers(
        secondUserStub().email,
      );
      const result = await voucherService.validateVouchers(
        secondUserStub().email,
        emailVouchers[0]._id.toString(),
      );
      expect(result).toMatchObject({
        message: 'No valid/unused vouchers with this email and code was found',
      });
    });

    it("then It should throw an error because the email doesn't exist", async () => {
      const emailVouchers = await voucherService.getEmailVouchers(
        secondUserStub().email,
      );
      const result = await voucherService.validateVouchers(
        'omar1111@gmail.com',
        emailVouchers[0]._id.toString(),
      );
      expect(result).toMatchObject({
        message: 'No valid/unused vouchers with this email and code was found',
      });
    });
  });
});
