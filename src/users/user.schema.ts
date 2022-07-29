// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Exclude } from 'class-transformer';

import mongoose, { model } from 'mongoose';

// import AddressSchema from './address.schema';
import { ObjectID } from 'mongodb';
import { AddressSchema } from './address.schema';
// import mongoose from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop()
//   _id?: ObjectID;
//   @Prop({ unique: true })
//   userId: number;

//   @Prop({ unique: true })
//   email: string;

//   @Prop({ nullable: true })
//   phoneNumber?: string;

//   @Prop()
//   name: string;

//   @Prop({ nullable: true })
//   @Exclude()
//   password?: string;

//   @Prop({ default: false })
//   isRegisteredWithGoogle: boolean;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }] })
//   address: Address;

//   @Prop({
//     nullable: true,
//   })
//   @Exclude()
//   currentHashedRefreshToken?: string;

//   @Prop({ default: false })
//   isEmailConfirmed: boolean;

//   @Prop({ default: false })
//   isPhoneNumberConfirmed: boolean;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
export interface IUser extends Document {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: number;
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
  currentHashedRefreshToken: string;
  isEmailConfirmed: boolean;
  isPhoneNumberConfirmed: boolean;
  address?: { id: number; street: string; city: string; country: string };
}

export const UserSchema = new mongoose.Schema<IUser>({
  userId: Number,
  email: String,
  phoneNumber: String,
  name: String,
  password: String,
  currentHashedRefreshToken: String,
  isEmailConfirmed: Boolean,
  isPhoneNumberConfirmed: Boolean,
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: AddressSchema }],
});

export const User = model<IUser>('User', UserSchema);
