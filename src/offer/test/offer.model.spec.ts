import { Test } from '@nestjs/testing';
import { OfferModule } from '../offer.module';
import { Connection } from 'mongoose';
import { OfferService } from '../offer.service';
import { DatabaseService } from '../../database/database.service';
import { offerStub } from './stubs/offer.stub';
import { AppModule } from '../../app.module';
import { OfferInterface } from '../offer.model';

describe('OfferModel', () => {
  let dbConnection: Connection;
  let offerService: OfferService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, OfferModule],
    }).compile();
    offerService = moduleRef.get<OfferService>(OfferService);
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });
  afterAll(async () => {
    await dbConnection.collection('offers').deleteMany({});
    await dbConnection.close();
  });
  describe('when createOffer gets called', () => {
    it('then It should create offer', async () => {
      const result = await offerService.createOffer(offerStub());
      expect(result).toMatchObject(offerStub());
    });
    it('then It should reject offer less than 1', async () => {
      const badOfferStub: OfferInterface = { name: 'discount', discount: 0 };
      await expect(offerService.createOffer(badOfferStub)).rejects.toThrow();
    });
    it('then It should reject offer bigger than 100', async () => {
      const badOfferStub: OfferInterface = { name: 'discount', discount: 101 };
      await expect(offerService.createOffer(badOfferStub)).rejects.toThrow();
    });
  });
  describe('when getAllOffers gets called', () => {
    it('then It should return offers in database', async () => {
      const result = await offerService.getAllOffers();
      expect(result).toMatchObject([offerStub()]);
    });
  });
});
