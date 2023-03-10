import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const TypeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const NODE_ENV = configService.get('NODE_ENV');
    const option = {
      connectionLimit: 1000,
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
      type: configService.get('DB_TYPE'),
      host: configService.get(`${NODE_ENV}_DB_HOST`),
      port: Number(configService.get<number>(`${NODE_ENV}_DB_PORT`)),
      username: configService.get(`${NODE_ENV}_DB_USERNAME`),
      database: configService.get(`${NODE_ENV}_DB_DATABASE`),
      password: configService.get(`${NODE_ENV}_DB_PASSWORD`),
      entities: [
        path.join(__dirname, '../../models/*.ts'),
        path.join(__dirname, '../../models/*.js'),
      ],
      autoLoadEntities: true,
      synchronize: true,
      ...(NODE_ENV === 'DEVELOPMENT'
        ? { retryAttempts: 10, logging: true }
        : { logging: false }),
    };

    return option;
  },
};
