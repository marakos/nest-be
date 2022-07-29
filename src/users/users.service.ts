import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, IUser } from './user.schema';
import CreateUserDto from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<IUser>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByIds(ids: number[]) {
    return this.userModel.find({ userId: { $in: ids } });
  }

  async getById(userId: number) {
    const user = await this.userModel.findOne({ userId });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userModel.create({
      ...userData,
    });
    console.log(newUser);
    // await this.userModel.save(newUser);
    return newUser;
  }

  // async createWithGoogle(email: string, name: string) {
  //   const newUser = await this.userModel.create({
  //     email,
  //     name,
  //     isRegisteredWithGoogle: true,
  //   });
  //   await this.userModel.updateOne(newUser);
  //   return newUser;
  // }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = refreshToken
      ? await bcrypt.hash(refreshToken, 10)
      : null;
    await this.userModel.updateOne(
      { userId: userId },
      { $set: { currentHashedRefreshToken } },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async markEmailAsConfirmed(email: string) {
    this.userModel.updateOne(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  async markPhoneNumberAsConfirmed(userId: number) {
    this.userModel.updateOne(
      { userId },
      {
        isPhoneNumberConfirmed: true,
      },
    );
  }
}
