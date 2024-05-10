import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { StudentDto } from './dto/student.dto';
import { ResponseHandler } from 'src/common/response.handler';
import { ConstantsMessages } from 'src/config/constants.messages';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly responseHandler: ResponseHandler,
  ) {}

  async getAllStudents(): Promise<any> {
    const studentList = await this.studentRepository.findAll();
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

  async getStudentById(id: number): Promise<any> {
    const student = await this.studentRepository.findById(id);
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

  async createNewStudent(dto: StudentDto): Promise<any> {
    try {
      const exists = await this.studentRepository.findByDocNumber(
        dto.docNumber,
      );
      if (exists) {
        return this.responseHandler.handleFailure(
          ConstantsMessages.STUDENT_ALREADY_EXISTS,
          HttpStatus.UNPROCESSABLE_ENTITY,
          UnprocessableEntityException,
        );
      }
      await this.studentRepository.createStudent(dto);
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

  async updateStudent(id: number, dto: StudentDto): Promise<any> {
    try {
      const student = await this.getStudentById(id);
      if (student) {
        await this.studentRepository.updateStudent(id, dto);
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

  async deleteStudentById(id: number): Promise<any> {
    const student = await this.getStudentById(id);
    const message = `Estudiante ${student.data.firstName} ${student.data.lastName} eliminado`;
    if (student) {
      await this.studentRepository.destroy(id);
      return this.responseHandler.handleSuccess(message, HttpStatus.OK);
    }
  }
}
