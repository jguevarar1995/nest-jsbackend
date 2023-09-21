import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'students' })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, unique: true })
  docNumber: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  phone: string;

  @Column({ type: 'int', nullable: false })
  grade: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  course: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: false })
  score: number;

  @Column({ type: 'tinyint', default: 1 })
  active: number;
}
