import { OfferInterface } from 'src/offer/offer.model';

export const offerStub = (): OfferInterface => {
  return {
    name: 'offer23',
    discount: 23,
  };
};

export const secondOfferStub = (): OfferInterface => {
  return {
    name: 'offer44',
    discount: 44,
  };
};
