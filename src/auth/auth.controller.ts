/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') // AuthController handles authentication-related routes
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return token;
  }

  @Post('login')
  async login(
    @Body() loginUserDto: Pick<RegisterUserDto, 'email' | 'password'>,
  ) {
    // Implement login logic here
    const { email, password } = loginUserDto;

    return { message: 'Login endpoint not yet implemented' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getUserById(req.user.sub);
    return {
      id: req.user.sub,
      email: user?.email,
      name: user?.fname + ' ' + user?.lname,
    };
  }
}
