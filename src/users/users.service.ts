import { Role } from './../enums/role.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/dtos/Register.dto';
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

  async findOneByName(_username: string): Promise<Users> {
    try {
      const response = this.usersModel.findOne({ username: _username }).exec();
      if (response === undefined || response === null) {
        throw new NotFoundException(`Invalid Username: ${_username} `);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }
}
