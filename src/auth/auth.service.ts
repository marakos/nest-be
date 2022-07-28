import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (user) {
      console.log(user.password.toString(), pass);
      if (user.password === pass) return user;
      throw new HttpException(
        {
          status: HttpStatus.SEE_OTHER,
          error: 'Wrong password',
        },
        HttpStatus.SEE_OTHER,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.SEE_OTHER,
        error: 'Username does not exist',
      },
      HttpStatus.SEE_OTHER,
    );
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: {
    username: string;
    password: string;
  }): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
