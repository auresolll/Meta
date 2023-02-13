import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';
import configAdminFirebase from './config/config.admin.firebase';
import { SwaggerSetting } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adminConfig: ServiceAccount = {
    projectId: configAdminFirebase.project_id,
    privateKey: configAdminFirebase.private_key,
    clientEmail: configAdminFirebase.client_email,
  };
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL:
      'https://images-services-52149-default-rtdb.asia-southeast1.firebasedatabase.app/',
  });

  app.enableCors();
  SwaggerSetting(app);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
