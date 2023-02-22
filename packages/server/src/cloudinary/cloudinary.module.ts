import { PassportJwtStrategy } from './../auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'nestjs-cloudinary';
import { ImagesSchema } from './schemas/images.schema';
import { NestCloudinaryController } from './cloudinary.controller';
import { NestCloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImagesSchema }]),
  ],
  controllers: [NestCloudinaryController],
  providers: [NestCloudinaryService, CloudinaryService, PassportJwtStrategy],
  exports: [NestCloudinaryService],
})
export class NestCloudinaryModule {}
