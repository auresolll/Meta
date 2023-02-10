import { UsersService } from './users.service';
import { Controller, Get, Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity

@Injectable()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('list')
  getUsers() {
    return this.usersService.findAll();
  }
}
