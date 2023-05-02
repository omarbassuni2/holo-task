import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './user.model';
// TO-DO: edit responses
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async addUser(@Body() user: UserInterface) {
    return this.userService.createUser(user);
  }
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }
}
