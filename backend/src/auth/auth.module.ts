import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FIREBASE, jwtConstants } from './constants';
import { FirebaseStrategy } from './strategies/firebase.strategy';
import { PassportJwtStrategy } from './strategies/jwt.strategy';
import { PassportLocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: FIREBASE }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      publicKey: jwtConstants.publicKey,
      privateKey: jwtConstants.privateKey,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PassportLocalStrategy,
    PassportJwtStrategy,
    FirebaseStrategy,
  ],
})
export class AuthModule {}
