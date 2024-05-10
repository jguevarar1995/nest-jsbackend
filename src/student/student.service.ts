import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from './dto/student.dto';
import { StudentEntity } from './student.entity';
import { ResponseHandler } from 'src/common/response.handler';
import { ConstantsMessages } from 'src/config/constants.messages';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: StudentRepository,
    private responseHandler: ResponseHandler,
  ) {}

  async getAll(): Promise<any> {
    const studentList = await this.studentRepository.find();
    if (!studentList.length) {
      return this.responseHandler.handleFailure(
        ConstantsMessages.EMPTY_STUDENTS_LIST,
        HttpStatus.NOT_FOUND,
        NotFoundException,
      );
    }
    return this.responseHandler.handleSuccess(
      ConstantsMessages.STATUS_OK,
      HttpStatus.OK,
      studentList,
    );
  }

  async findById(id: number): Promise<any> {
    const student = await this.studentRepository.findOneBy({ id: id });
    if (!student) {
      return this.responseHandler.handleFailure(
        ConstantsMessages.STUDENT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
        NotFoundException,
      );
    }
    return this.responseHandler.handleSuccess(
      ConstantsMessages.STATUS_OK,
      HttpStatus.OK,
      student,
    );
  }

  async findByDocumentNumber(docNumber: number): Promise<any> {
    const student = await this.studentRepository.findOneBy({
      docNumber: docNumber,
    });
    return student;
  }

  async create(dto: StudentDto): Promise<any> {
    try {
      const exists = await this.findByDocumentNumber(dto.docNumber);
      if (exists) {
        return this.responseHandler.handleFailure(
          ConstantsMessages.STUDENT_ALREADY_EXISTS,
          HttpStatus.UNPROCESSABLE_ENTITY,
          UnprocessableEntityException,
        );
      }
      await this.studentRepository.save(dto);
      return this.responseHandler.handleSuccess(
        ConstantsMessages.STATUS_CREATED,
        HttpStatus.CREATED,
        dto,
      );
    } catch (error) {
      return this.responseHandler.handleFailure(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        InternalServerErrorException,
      );
    }
  }

  async update(id: number, dto: StudentDto): Promise<any> {
    try {
      const student = await this.findById(id);
      if (student) {
        await this.studentRepository.update(id, dto);
        return this.responseHandler.handleSuccess(
          ConstantsMessages.STATUS_OK,
          HttpStatus.OK,
          dto,
        );
      }
    } catch (error) {
      return this.responseHandler.handleFailure(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        InternalServerErrorException,
      );
    }
  }

  async deleteById(id: number): Promise<any> {
    const student = await this.findById(id);
    const message = `Estudiante ${student.data.firstName} ${student.data.lastName} eliminado`;
    if (student) {
      await this.studentRepository.delete(id);
      return this.responseHandler.handleSuccess(message, HttpStatus.OK);
    }
  }
}
