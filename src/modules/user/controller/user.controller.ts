import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  PipeTransform,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { toStringPipe } from 'src/common/pipes/toString.pipe';
import { CreateUserDto } from '../models/user.dto';
import { IUser } from '../models/user.interface';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '增加用户' })
  @Post('create')
  async createUser(@Body() user: CreateUserDto) {
    await this.userService.create(user);
  }

  @Get()
  async getAllUsers(): Promise<IUser[]> {
    console.log(process.env.NODE_ENV);
    return await this.userService.getAllUser();
  }

  @Get('testException')
  async getException() {
    throw new HttpException(
      { message: '禁止访问', reason: 'no allowed', code: HttpStatus.FORBIDDEN },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('testPipe/:id')
  async testPipe(@Param('id', toStringPipe) id: string) {
    console.log(id);
  }

  @Get('testInterceptor/:id')
  @UseInterceptors(TransformInterceptor)
  async testInterceptor(@Param('id') id: string) {
    console.log(id);
    return id;
  }

  // @Get()
  // getAllUsers(): string[] {
  //   return ['user1', 'user2', 'user3'];
  // }
  // @Get('all')
  // findAll(): Observable<any[]> {
  //   return of(['111', '222']);
  // }
  // @ApiOperation({ summary: '通过id获取用户' })
  // @Get('getUser/:id')
  // getOneUser(@Param('id') params: string) {
  //   console.log(params);
  //   return params;
  // }
  // @ApiOperation({ summary: '增加用户' })
  // @Post('create')
  // createUser(@Body() CreateUser: CreateUserDto) {
  //   return CreateUser;
  // }
  // @ApiOperation({ summary: '修改用户' })
  // @Put(':id')
  // modifyUser(@Param('id') id: string) {
  //   return id;
  // }
  // @ApiOperation({ summary: '通过名字获取用户' })
  // @Get('getUserByName/:name')
  // getUserByName(@Param('name') name: string) {
  //   return name;
  // }
}
