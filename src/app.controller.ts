import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  @HttpCode(200)
  getHealth(): string {
    return this.appService.getHello();
  }
}

// @GetMapping("/health")
// public String healthCheck() throws IOException {
//     return "Looks OK!";
// }
// @GetMapping("/")
// public String health() throws IOException {
//     return "Looks OK!";
// }
