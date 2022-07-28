import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectID } from 'mongodb';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: ObjectID;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
