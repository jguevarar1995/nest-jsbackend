import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('api/v1/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAll() {
    return this.studentService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: StudentDto) {
    return this.studentService.create(dto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: StudentDto) {
    return this.studentService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteById(id);
  }
}
