import { offerStub } from '../test/stubs/offer.stub';
export const OfferService = jest.fn().mockReturnValue({
  createOffer: jest.fn().mockResolvedValue(offerStub),
  getAllOffers: jest.fn().mockResolvedValue([offerStub]),
});
