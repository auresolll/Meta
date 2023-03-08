import { SignUpAuthDto } from './../auth/dto/sign-up.dto';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  createFlied(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async createUserSignUp(signUpAuthDto: SignUpAuthDto): Promise<User> {
    const userObject: User = this.userRepository.create({
      ...signUpAuthDto,
    });
    await this.userRepository.save(userObject);
    if (userObject.hasId() === false) {
      throw new BadRequestException(
        `[createUserSignUp]: Have error when create user #${signUpAuthDto.username}`,
      );
    }
    return userObject;
  }

  async findByUserName(_username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username: _username });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(_id: number) {
    return this.userRepository.findOneBy({ id: _id });
  }
}
