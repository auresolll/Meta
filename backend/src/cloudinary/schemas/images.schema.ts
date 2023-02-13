import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImagesDocument = HydratedDocument<Images>;

@Schema()
export class Images {
  [x: string]: any;
  @Prop()
  name: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  url: string;

  @Prop({ required: false })
  create_at: string;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);
