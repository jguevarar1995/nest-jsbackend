import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/v1/login')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    @HttpCode(HttpStatus.OK)
    async doLogin(@Body() dto: UserDto): Promise<any> {
        return this.userService.performLogin(dto);
    }
}
