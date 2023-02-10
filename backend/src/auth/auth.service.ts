import { Role } from './../enums/role.enum';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleTokenFactory } from '@nestjs/core/injector/module-token-factory';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/Login.dto';
import { RegisterDto } from '../dtos/Register.dto';
import { Users } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { DecodedIdToken } from './decoded-id-token';
import { compareHashPassword, generatorHashPassword } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateLocal(account: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByName(account.username);

    try {
      if (user === undefined || user === null)
        throw new NotFoundException(`Invalid Username: ${account.username} `);

      const isPasswordMatching = await compareHashPassword(
        account.password,
        user.password,
      );

      if (isPasswordMatching === false) {
        throw new UnauthorizedException('Invalid Password');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async loginWithLocal(loginData: LoginDto): Promise<{
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

  async registerWithLocal(registerData: RegisterDto): Promise<Users> {
    const { username, password, role } = registerData;
    const isExist = await this.usersService.findOneByName(username);
    try {
      if (isExist._id)
        throw new BadRequestException(
          `Invalid Register username have been exist: ${username}`,
        );

      const newRegisterData: RegisterDto = {
        username,
        password: (await generatorHashPassword(password)).hash,
        role,
      };

      return this.usersService.create(newRegisterData);
    } catch (error) {
      throw error;
    }
  }

  async loginWithFirebaseGoogle(token: string): Promise<{
    access_token: string;
  }> {
    const decode = this.decodedIdToken(token);
    return this.handleProcessLoginGoogle(
      (decode as DecodedIdToken).email,
      decode as DecodedIdToken,
    );
  }

  async handleProcessLoginGoogle(
    _email: string,
    options: DecodedIdToken,
  ): Promise<{
    access_token: string;
  }> {
    const isExitsAccount = await this.usersService.findOneByEmail(_email);

    if (isExitsAccount._id) {
      const payload = {
        username: isExitsAccount.email,
        sub: isExitsAccount._id,
        role: isExitsAccount.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    const createUserObject = await this.usersService.createWithGoogle(
      options as DecodedIdToken,
    );

    try {
      if (createUserObject === undefined || createUserObject === null)
        throw new BadRequestException('Register Login Google with error');

      const payload = {
        username: createUserObject.email,
        sub: createUserObject._id,
        role: Role.User,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  decodedIdToken(token: string) {
    try {
      const decode = this.jwtService.decode(token);

      if (typeof decode === 'string')
        throw new UnauthorizedException('Token invalid');

      return decode;
    } catch (error) {
      throw error;
    }
  }
}
