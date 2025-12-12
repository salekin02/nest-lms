import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(registerUserDto: RegisterUserDto) {
    try {
      return await this.userModel.create(registerUserDto);
    } catch (error: unknown) {
      const err = error as { code: number; keyValue: Record<string, unknown> };
      console.error('Error creating user:', error);
      const DUPLICATE_KEY_ERROR_CODE = 11000;
      if (err.code === DUPLICATE_KEY_ERROR_CODE) {
        throw new ConflictException(
          Object.keys(err.keyValue)[0] + ' already exists',
        );
      }
    }
  }

  async getUserById(userId: string) {
    return this.userModel.findById(userId).exec();
  }
}
