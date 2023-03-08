/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './../models/user.entity';
import { UsersService } from './../users/users.service';
import { SignInAuthDto } from './dto/sign-in.dto';
import { SignUpAuthDto } from './dto/sign-up.dto';
import { ResultPayloadJWTObject, ResultValidateObject } from './type';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    _username: string,
    _password: string,
  ): Promise<ResultValidateObject | null> {
    const user: User | null = await this.usersService.findByUserName(_username);
    if (user && user.password === _password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(signInAuthDto: SignInAuthDto): Promise<{
    access_token: string;
  }> {
    const user = await this.usersService.findByUserName(signInAuthDto.username);
    const payload: ResultPayloadJWTObject = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      gender: user.gender,
      avatar: user.avatar,
      banner: user.banner,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpAuthDto: SignUpAuthDto): Promise<User> {
    const isExits: User | null = await this.usersService.findByUserName(
      signUpAuthDto.username,
    );
    if (isExits)
      throw new BadRequestException(
        `[signUp]: The user #${signUpAuthDto.username} have created`,
      );
    return this.usersService.createUserSignUp(signUpAuthDto);
  }
}
