import { SignInAuthDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/sign-up.dto';

@ApiTags('app/auth')
@Controller('app/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('signUp')
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<User> {
    return this.authService.signUp(signUpAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Body() signInAuthDto: SignInAuthDto): Promise<{
    access_token: string;
  }> {
    return this.authService.signIn(signInAuthDto);
  }
}
