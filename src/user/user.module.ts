import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseHandler } from 'src/common/response.handler';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UserService, ResponseHandler],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
