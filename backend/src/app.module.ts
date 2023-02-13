import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NestCloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { cloudinaryConfig } from './config/cloudinary';
import { configMongoose } from './config/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(configMongoose),
    CloudinaryModule.forRootAsync(cloudinaryConfig),
    AuthModule,
    UsersModule,
    NestCloudinaryModule,
  ],
})
export class AppModule {}
