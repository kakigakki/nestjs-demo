import { IUser } from './user.interface';

export class CreateUserDto implements IUser {
  name: string;
  age: number;
}
