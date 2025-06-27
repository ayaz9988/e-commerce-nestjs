import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticatinoGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  async singup(@Body() userSignupDto: UserSignupDto) {
    return { user: await this.usersService.signup(userSignupDto) };
  }

  @Post('signin')
  async signin(@Body() userSigninDto: UserSigninDto) {
    const user = await this.usersService.signin(userSigninDto);
    const accessToken = await this.usersService.accessToken(user);

    return {
      accessToken,
      user
    }
  }


  // @AuthorizeRoles(Roles.ADMIN)
  // @UseGuards(AuthenticatinoGuard, AuthorizeGuard)
  // with mixin
  @UseGuards(AuthenticatinoGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }


  @UseGuards(AuthenticatinoGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser) {
    return currentUser;
  }
}
