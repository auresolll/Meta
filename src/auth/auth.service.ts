import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/Login.dto';
import { RegisterDto } from '../dtos/Register.dto';
import { Users } from './../users/schemas/users.schema';
import { UsersService } from './../users/users.service';
import { compareHashPassword, generatorHashPassword } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateAccount(account: LoginDto): Promise<any> {
    const { username, password } = account;
    const user = await this.usersService.findOneByName(username);

    const isPasswordMatching = await compareHashPassword(
      password,
      user.password,
    );
    try {
      if (isPasswordMatching === false) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        throw new UnauthorizedException('Invalid Password');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(loginData: LoginDto): Promise<{
    access_token: string;
  }> {
    const { username } = loginData;
    const user = await this.usersService.findOneByName(username);
    const payload = {
      username: username,
      sub: user._id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerData: RegisterDto): Promise<Users> {
    const { username, password, role } = registerData;
    const newResisterData: RegisterDto = {
      username,
      password: (await generatorHashPassword(password)).hash,
      role,
    };
    return this.usersService.create(newResisterData);
  }
}
