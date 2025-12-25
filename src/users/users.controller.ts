import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { getUser } from '../auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards( AuthGuard('jwt') )
  getMe( @getUser() user: User ) {
    return user;
  }

  @Post()
  create( @Body() createUserDto: CreateUserDto ) {
    return this.usersService.createUser( createUserDto );
  }
}
