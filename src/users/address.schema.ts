// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSchema } from './user.schema';

// export type AddressDocument = Address & Document;

// @Schema()
// export class Address {
//   @Prop()
//   id: number;

//   @Prop()
//   street: string;

//   @Prop()
//   city: string;

//   @Prop()
//   country: string;

//   // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
//   // user?: User;
// }

// export const AddressSchema = SchemaFactory.createForClass(Address);
export const AddressSchema = new mongoose.Schema({
  id: Number,
  street: String,
  city: String,
  country: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: UserSchema }],
});
