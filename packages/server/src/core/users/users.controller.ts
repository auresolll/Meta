/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginatedResult } from './../../dtos/PaginatedResult.dto';
import { User } from './../../models/user.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersPaginationDto } from './dto/get-user-pagination.dto';
import { UsersService } from './users.service';

@ApiTags('API of users')
@Controller('app/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('pagination/:page/:limit')
  getUsersWithPagination(
    @Param() getUsersPaginationDto: GetUsersPaginationDto,
  ): Promise<PaginatedResult<User>> {
    return this.usersService.getUsersWithPagination(getUsersPaginationDto);
  }
}
