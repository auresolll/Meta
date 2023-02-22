import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  [x: string]: any;
  @Prop()
  username: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  email_verified: string;

  @Prop({ required: false })
  usb: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
