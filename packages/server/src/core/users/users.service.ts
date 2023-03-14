/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginatedResult } from './../../dtos/PaginatedResult.dto';
import { SignUpAuthDto } from './../../auth/dto/sign-up.dto';
import { User } from './../../models/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersPaginationDto } from './dto/get-user-pagination.dto';

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

  async getUsersWithPagination(
    getUsersPaginationDto: GetUsersPaginationDto,
  ): Promise<PaginatedResult<User>> {
    const { page, limit } = getUsersPaginationDto;
    const query = this.userRepository.createQueryBuilder('user');

    const totalCount = await query.getCount();
    query.offset((page - 1) * limit);
    query.limit(limit);

    const users = await query.getMany();

    return {
      data: users,
      pagination: {
        totalCount,
        page,
        limit,
      },
    };
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(_id: number) {
    return this.userRepository.findOneBy({ id: _id });
  }
}
