import { ConfigurableModuleAsyncOptions } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
export const cloudinaryConfig: ConfigurableModuleAsyncOptions<
  import('cloudinary').ConfigOptions,
  'create'
> &
  Partial<{
    isGlobal: boolean;
  }> = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    isGlobal: true,
    cloud_name: configService.get('cloudinary.cloudName'),
    api_key: configService.get('cloudinary.apiKey'),
    api_secret: configService.get('cloudinary.apiSecret'),
  }),
};
