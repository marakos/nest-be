import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): { message: string } {
    return this.appService.getHello();
  }
}
