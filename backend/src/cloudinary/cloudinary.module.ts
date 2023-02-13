import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'nestjs-cloudinary';
import { PassportJwtStrategy } from './../auth/strategies/jwt.strategy';
import { NestCloudinaryClientController } from './cloudinary.controller';
import { NestCloudinaryClientService } from './cloudinary.service';
import { ImagesSchema } from './schemas/images.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImagesSchema }]),
  ],
  controllers: [NestCloudinaryClientController],
  providers: [
    NestCloudinaryClientService,
    CloudinaryService,
    PassportJwtStrategy,
  ],
  exports: [NestCloudinaryClientService],
})
export class NestCloudinaryModule {}
