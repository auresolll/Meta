import { SignInAuthDto } from './dto/sign-in.dto';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign-up.dto';

@ApiTags('app/auth')
@Controller('app/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<User> {
    return this.authService.signUp(signUpAuthDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  signIn(@Body() signInAuthDto: SignInAuthDto): Promise<{
    access_token: string;
  }> {
    return this.authService.signIn(signInAuthDto);
  }
}
