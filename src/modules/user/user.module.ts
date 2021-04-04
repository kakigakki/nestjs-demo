import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user/create');
  }
}
