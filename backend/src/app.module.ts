import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { AuthModule } from './auth/auth.module';
import { cloudinaryConfig } from './config/cloudinary';
import { configMongoose } from './config/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(configMongoose),
    CloudinaryModule.forRootAsync(cloudinaryConfig),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
