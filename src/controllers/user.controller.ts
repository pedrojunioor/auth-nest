import { Controller, Get, Post, Put, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { userDTO, userUpdateDTO } from 'src/dto/user-dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserService } from 'src/services/users.service';

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get('users')
  async getUsers() {
    return await this.userService.getUsers()
  }
  
  @UseGuards(AuthGuard)
  @Get('users/:id')
  async getUserById(@Param() params) {
    const { id } = params
    return await this.userService.getUserById(id)
  }
  
  @UseGuards(AuthGuard)
  @Post('users')
  async createUser(@Body() body: userDTO) {
    return await this.userService.createUser(body)
  }
  
  @UseGuards(AuthGuard)
  @Put('users')
  async editUser(@Body() body: userUpdateDTO) {
    return await this.userService.editUser(body)
  }
  
  @UseGuards(AuthGuard)
  @Delete('users')
  async deleteUser(@Body() body: userUpdateDTO) {
    const { id } = body
    return await this.userService.deleteUser(id)
  }
}
