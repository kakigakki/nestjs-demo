import { Injectable } from '@nestjs/common';
import { IUser } from '../models/user.interface';

@Injectable()
export class UserService {
  private readonly users: IUser[] = [];

  create(user: IUser) {
    this.users.push(user);
  }

  getAllUser() {
    return this.users;
  }
}
