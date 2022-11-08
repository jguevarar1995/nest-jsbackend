import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) { }

    @Get()
    async getAll() {
        return await this.studentService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.studentService.findById(id);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    async create(@Body() dto: StudentDto) {
        return await this.studentService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: StudentDto) {
        return await this.studentService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.studentService.deleteById(id);
    }
}
