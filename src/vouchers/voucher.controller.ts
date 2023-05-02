import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherInterface } from './voucher.model';
// TO-DO: edit responses
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}
  @Get(':email')
  async getEmailVouchers(@Param('email') email: string) {
    return this.voucherService.getEmailVouchers(email);
  }
  @Post()
  async createNewVoucher(
    @Body()
    voucherDetails: VoucherInterface,
  ) {
    return this.voucherService.createVoucher(voucherDetails);
  }
}
