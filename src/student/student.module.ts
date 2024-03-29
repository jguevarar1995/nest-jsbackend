import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
