import { VoucherInterface } from 'src/vouchers/voucher.model';

export const voucherStub = (): VoucherInterface => {
  return {
    assignedSpecialOffer: 'offer44',
    expirationDate: new Date('2023-12-01'),
  };
};

export const voucherDiscount = () => {
  return {
    discount: 23,
  };
};
