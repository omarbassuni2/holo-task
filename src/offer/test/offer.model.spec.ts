import { Test } from '@nestjs/testing';
import { OfferModule } from '../offer.module';
import { Connection } from 'mongoose';
import { OfferService } from '../offer.service';
import { DatabaseService } from '../../database/database.service';
import { offerStub } from './stubs/offer.stub';
import { AppModule } from '../../app.module';

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
  });
  describe('when createOffer gets called', () => {
    it('then It should create offer', async () => {
      const result = await offerService.createOffer(offerStub());
      expect(result).toMatchObject(offerStub());
    });
  });
});
