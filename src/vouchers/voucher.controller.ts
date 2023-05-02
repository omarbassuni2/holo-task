import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherInterface } from './voucher.model';
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}
  @Get(':email')
  async getEmailVouchers(@Param('email') email: string) {
    return this.voucherService.getEmailVouchers(email);
  }
  @Put(':email/:voucherCode')
  async validateVouchers(@Param() params) {
    return this.voucherService.validateVouchers(
      params.email,
      params.voucherCode,
    );
  }
  @Post()
  async createNewVoucher(
    @Body()
    voucherDetails: VoucherInterface,
  ) {
    return this.voucherService.createVoucher(voucherDetails);
  }
}
