import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from '../dtos/Register.dto';
import { DecodedIdToken } from '../auth/decoded-id-token';
import { Users, UsersDocument } from './schemas/users.schema';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async create(registerData: RegisterDto): Promise<Users> {
    const { username, password, role } = registerData;
    const createdUser = await this.usersModel.create({
      username,
      password,
      role,
    });
    return createdUser;
  }

  async createWithGoogle(registerData: DecodedIdToken) {
    const { email, email_verified, sub } = registerData;
    console.log('[createWithGoogle]', registerData);

    const createdUser = await this.usersModel.create({
      email,
      email_verified,
      sub,
    });
    return createdUser;
  }

  async findOneByName(_username: string): Promise<Users | undefined> {
    return this.usersModel.findOne({ username: _username }).exec();
  }

  async findOneByEmail(_email: string): Promise<Users | undefined> {
    return this.usersModel.findOne({ email: _email }).exec();
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }
}
