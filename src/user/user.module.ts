import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { LoginController } from './user.controller';
import { LoginService } from './user.service';

@Module({
  imports: [AuthModule, UsersModule, LoginModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
