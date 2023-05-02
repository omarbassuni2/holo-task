import { Test } from '@nestjs/testing';
import { OfferController } from '../offer.controller';
import { OfferService } from '../offer.service';
import { OfferInterface } from '../offer.model';
import { offerStub } from './stubs/offer.stub';

jest.mock('../offer.service');
describe('OfferController', () => {
  let offerController: OfferController;
  let offerService: OfferService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [OfferController],
      providers: [OfferService],
    }).compile();
    offerController = moduleRef.get<OfferController>(OfferController);
    offerService = moduleRef.get<OfferService>(OfferService);
    jest.clearAllMocks();
  });

  describe('getOffers', () => {
    describe('when getOffers is called', () => {
      let offer: OfferInterface[];

      beforeEach(async () => {
        offer = await offerController.getOffers();
      });

      test('then it should be called with', () => {
        expect(offerService.getAllOffers).toBeCalledWith();
      });

      test('then it should return offer', () => {
        expect(offer).toEqual([offerStub]);
      });
    });
  });

  describe('createOffer', () => {
    describe('when createOffer is called', () => {
      let offer: OfferInterface;
      beforeEach(async () => {
        offer = {
          name: offerStub().name,
          discount: offerStub().discount,
        };
        await offerController.addOffer(offer);
      });
      test('then  it should call offer service', () => {
        expect(offerService.createOffer).toBeCalledWith(offer);
      });
      test('then  it should return offer', () => {
        expect(offerService.createOffer).toBeCalledWith(offer);
      });
    });
  });
});
