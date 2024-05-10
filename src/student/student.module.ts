import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { ResponseHandler } from 'src/common/response.handler';
import { StudentRepository } from './student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentRepository, StudentService, ResponseHandler],
  controllers: [StudentController],
  exports: [StudentService, TypeOrmModule],
})
export class StudentModule {}
