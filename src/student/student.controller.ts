import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}
    
    @Get()
    async getAll() {
        return await this.studentService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.studentService.findById(id);
    }

    @Post()
    async create(@Body() dto: StudentDto) {
        return await this.studentService.create(dto).catch( err => {
            throw new HttpException({
                message: err.message
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ); 
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
