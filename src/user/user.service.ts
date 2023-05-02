import { Injectable } from '@nestjs/common';
import { UserInterface } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserInterface>,
  ) {}
  async createUser(user: UserInterface) {
    try {
      return this.userModel.create(user);
    } catch (error) {
      throw new Error("Couldn't create user\n" + error);
    }
  }

  async getAllUsers() {
    try {
      return this.userModel.find({});
    } catch (error) {}
  }
}
