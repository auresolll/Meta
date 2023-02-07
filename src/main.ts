import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetting } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerSetting(app);
  await app.listen(process.env.PORT);
}
bootstrap();
