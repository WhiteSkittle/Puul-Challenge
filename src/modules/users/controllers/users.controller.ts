import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUsersDto } from '../dto/find-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user.
   * @param dto Data for creating the user
   * @returns The created user
   */
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  /**
   * Retrieves users matching the provided filters.
   * @param filters Query parameters for filtering users
   * @returns Array of users
   */
  @Get()
  async findAll(@Query() filters: FindUsersDto) {
    return this.usersService.findAll(filters);
  }
}
