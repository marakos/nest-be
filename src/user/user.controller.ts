import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import LogInDto from './dto/login.dto';

@Controller()
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @ApiBody({ type: LogInDto })
  async login(@Body() credentials: LogInDto) {
    return this.authService.validateUser(
      credentials.username,
      credentials.password,
    );
  }

  @Post('auth/register')
  // @ApiBody({ type: LogInDto })
  async register(@Body() credentials: { username: string; password: string }) {
    console.log(credentials);
    return this.authService.register(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
