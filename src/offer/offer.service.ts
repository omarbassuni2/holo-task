import { Injectable } from '@nestjs/common';
import { OfferInterface } from './offer.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel('Offer')
    private readonly offerModel: Model<OfferInterface>,
  ) {}
  async createOffer(offer: OfferInterface) {
    try {
      return this.offerModel.create(offer);
    } catch (error) {
      throw new Error("Couldn't create offer\n" + error);
    }
  }

  async getAllOffers() {
    try {
      return this.offerModel.find({});
    } catch (error) {
      throw new Error("Couldn't get all offers\n" + error);
    }
  }
}
