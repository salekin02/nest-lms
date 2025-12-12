import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    console.log('Registering user with data:', registerUserDto);

    const hash = await bcrypt.hash(registerUserDto.password, 10);
    console.log('Hashed password:', hash);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = { sub: user?._id, role: user?.role };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
