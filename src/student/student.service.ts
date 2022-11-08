import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { StudentDto } from './dto/student.dto';
import { StudentEntity } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentEntity)
        private studentRepository: StudentRepository
    ) { }

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

    async findByDocumentNumber(doc_number: number): Promise<StudentEntity> {
        const student = await this.studentRepository.findOneBy({ doc_number: doc_number });
        return student;
    }

    async create(dto: StudentDto): Promise<any> {
        const exists = await this.findByDocumentNumber(dto.doc_number);
        if (exists) throw new BadRequestException(new MessageDto('Ya existe el número de documento'));
        const student = this.studentRepository.create(dto);
        await this.studentRepository.save(student);
        return new MessageDto(`Estudiante ${student.first_name} ${student.last_name} creado`);
    }

    async update(id: number, dto: StudentDto): Promise<any> {
        const student = await this.findById(id);
        if (!student) throw new BadRequestException(new MessageDto('Ese estudiante no existe'));
        const updatedBody = Object.assign(student, dto);
        await this.studentRepository.save(updatedBody);
        return new MessageDto(`Estudiante ${student.first_name} ${student.last_name} actualizado`);
        /*//implementar Object.assign() para evitar reescritura de atributos uno a uno
        dto.doc_number? student.doc_number = dto.doc_number : student.doc_number = student.doc_number;
        dto.first_name? student.first_name = dto.first_name : student.first_name = student.first_name;
        dto.last_name? student.last_name = dto.last_name : student.last_name = student.last_name;
        dto.email? student.email = dto.email : student.email = student.email;
        dto.phone? student.phone = dto.phone : student.phone = student.phone;
        dto.grade? student.grade = dto.grade : student.grade = student.grade;
        dto.course? student.grade = dto.grade : student.grade = student.grade;
        dto.score? student.score = dto.score : student.score = student.score;
        await this.studentRepository.save(student);
        return { message: `Estudiante ${student.first_name} ${student.last_name} actualizado` };*/

    }

    async deleteById(id: number): Promise<any> {
        const student = await this.findById(id);
        await this.studentRepository.delete(student);
        return new MessageDto(`Estudiante ${student.first_name} ${student.last_name} eliminado`);
    }
}
