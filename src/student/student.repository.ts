import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from './dto/student.dto';

export class StudentRepository extends Repository<StudentEntity> {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {
    super(
      studentRepository.target,
      studentRepository.manager,
      studentRepository.queryRunner,
    );
  }

  async findAll(): Promise<StudentEntity[]> {
    return this.find();
  }

  async findById(id: number): Promise<StudentEntity> {
    return this.findOneBy({ id: id });
  }

  async findByDocNumber(docNumber: number): Promise<StudentEntity> {
    return this.findOneBy({ docNumber: docNumber });
  }

  async createStudent(student: StudentDto): Promise<StudentEntity> {
    const newStudent = this.create(student);
    return this.save(newStudent);
  }

  async updateStudent(
    id: number,
    updatedStudent: StudentDto,
  ): Promise<StudentEntity | undefined> {
    const currentStudent = await this.findById(id);
    if (!currentStudent) return undefined;
    Object.assign(currentStudent, updatedStudent);
    return this.save(currentStudent);
  }

  async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}
