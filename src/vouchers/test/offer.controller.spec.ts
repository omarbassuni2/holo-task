import { Test } from '@nestjs/testing';
import { VoucherController } from '../voucher.controller';
import { VoucherService } from '../voucher.service';
import { VoucherInterface } from '../voucher.model';
import { voucherStub } from './stubs/voucher.stub';

jest.mock('../voucher.service');
describe('VoucherController', () => {
  let voucherController: VoucherController;
  let voucherService: VoucherService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [VoucherController],
      providers: [VoucherService],
    }).compile();
    voucherController = moduleRef.get<VoucherController>(VoucherController);
    voucherService = moduleRef.get<VoucherService>(VoucherService);
    jest.clearAllMocks();
  });

  describe('getEmailVouchers', () => {
    describe('when getEmailVouchers is called', () => {
      let voucher: VoucherInterface[];

      beforeEach(async () => {
        voucher = await voucherController.getEmailVouchers(voucherStub().email);
      });

      test('then it should be called with', () => {
        expect(voucherService.getEmailVouchers).toBeCalledWith(
          voucherStub().email,
        );
      });

      test('then it should return voucher', () => {
        expect(voucher).toEqual([voucherStub]);
      });
    });
  });

  describe('createNewVoucher', () => {
    describe('when createNewVoucher is called', () => {
      let voucher: VoucherInterface;
      beforeEach(async () => {
        voucher = {
          email: voucherStub().email,
          assignedSpecialOffer: voucherStub().assignedSpecialOffer,
          expirationDate: voucherStub().expirationDate,
        };
        await voucherController.createNewVoucher(voucher);
      });
      test('then  it should call voucher service', () => {
        expect(voucherService.createVoucher).toBeCalledWith(voucher);
      });
      test('then  it should return voucher', () => {
        expect(voucherService.createVoucher).toBeCalledWith(voucher);
      });
    });
  });

  describe('when validateVouchers is called', () => {
    beforeEach(async () => {
      await voucherController.validateVouchers({
        email: voucherStub().email,
        voucherCode: 'voucherCode',
      });
    });

    test('then it should be called with', () => {
      expect(voucherService.validateVouchers).toBeCalledWith(
        voucherStub().email,
        'voucherCode',
      );
    });
  });
});
