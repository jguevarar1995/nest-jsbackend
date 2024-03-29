import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class StudentDto {
  @IsNumber()
  @IsNotEmpty()
  @Max(9999999999)
  docNumber: number;

  @IsString()
  @IsNotBlank({ message: 'First name should not be blank' })
  //@IsNotEmpty()
  //@Transform(({ value }: TransformFnParams) => value?.trim())
  firstName: string;
  @IsString()
  @IsNotBlank({ message: 'Last name should not be blank' })
  //@IsNotEmpty()
  //@Transform(({ value }: TransformFnParams) => value?.trim())
  lastName: string;

  @IsString()
  @IsNotBlank({ message: 'Email should not be blank' })
  //@IsNotEmpty()
  //@Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  email: string;

  @IsString()
  @IsNotBlank({ message: 'Phone should not be blank' })
  //@IsNotEmpty()
  //@Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(7, 10)
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(11)
  grade: number;

  @IsString()
  @IsNotBlank({ message: 'Course should not be blank' })
  //@IsNotEmpty()
  //@Transform(({ value }: TransformFnParams) => value?.trim())
  course: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.0)
  @Max(10.0)
  score: number;
}
