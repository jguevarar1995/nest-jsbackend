import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { StudentDto } from './dto/student.dto';
import { StudentEntity } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: StudentRepository,
  ) {}

  async getAll(): Promise<StudentEntity[]> {
    const list = await this.studentRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('La lista está vacía'));
    }
    return list;
  }

  async findById(id: number): Promise<StudentEntity> {
    const student = await this.studentRepository.findOneBy({ id: id });
    if (!student) {
      throw new NotFoundException(new MessageDto('No existe el estudiante'));
    }
    return student;
  }

  async findByDocumentNumber(docNumber: number): Promise<StudentEntity> {
    const student = await this.studentRepository.findOneBy({
      docNumber: docNumber,
    });
    return student;
  }

  async create(dto: StudentDto): Promise<any> {
    const exists = await this.findByDocumentNumber(dto.docNumber);
    if (exists)
      throw new BadRequestException(
        new MessageDto('Ya existe el número de documento'),
      );
    const student = this.studentRepository.create(dto);
    await this.studentRepository.save(student);
    return new MessageDto(
      `Estudiante ${student.firstName} ${student.lastName} creado`,
    );
  }

  async update(id: number, dto: StudentDto): Promise<any> {
    const student = await this.findById(id);
    if (!student)
      throw new BadRequestException(new MessageDto('Ese estudiante no existe'));
    const updatedBody = Object.assign(student, dto);
    await this.studentRepository.save(updatedBody);
    return new MessageDto(
      `Estudiante ${student.firstName} ${student.lastName} actualizado`,
    );
  }

  async deleteById(id: number): Promise<any> {
    const student = await this.findById(id);
    await this.studentRepository.delete(student);
    return new MessageDto(
      `Estudiante ${student.firstName} ${student.lastName} eliminado`,
    );
  }
}
