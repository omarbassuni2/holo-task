import { Body, Controller, Get, Post } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferInterface } from './offer.model';
@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}
  @Post()
  async addOffer(@Body() offer: OfferInterface) {
    return this.offerService.createOffer(offer);
  }
  @Get()
  async getOffers() {
    return this.offerService.getAllOffers();
  }
}
