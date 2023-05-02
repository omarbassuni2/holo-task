import { voucherStub, voucherDiscount } from '../test/stubs/voucher.stub';
export const VoucherService = jest.fn().mockReturnValue({
  createVoucher: jest.fn().mockResolvedValue(voucherStub),
  getEmailVouchers: jest.fn().mockResolvedValue([voucherStub]),
  validateVouchers: jest.fn().mockResolvedValue(voucherDiscount().discount),
});
