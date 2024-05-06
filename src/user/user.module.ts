import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response.handler';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, ResponseHandler],
  controllers: [UserController],
})
export class UserModule {}
