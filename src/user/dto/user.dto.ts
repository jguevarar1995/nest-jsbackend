import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class UserDto {
  @IsString()
  @IsNotBlank({ message: 'Email should not be blank' })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotBlank({ message: 'Password should not be blank' })
  password: string;

  @IsOptional()
  @Transform((value) => value, { toPlainOnly: true })
  roleId?: number;
}
