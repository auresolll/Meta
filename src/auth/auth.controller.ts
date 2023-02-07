import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { LoginDto } from '../dtos/Login.dto';
import { RegisterDto } from '../dtos/Register.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { HasRoles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData);
  }

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('private')
  getProfile(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('private/admin')
  getAdmin(@Request() req) {
    return req.user;
  }
}
