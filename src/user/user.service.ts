import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: UserRepository
    ) { }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ email: email });
        return user;
    }

    async performLogin(dto: UserDto): Promise<any> {
        const user = await this.findByEmail(dto.email);
        if (user) {
            if (dto.password === user.pass) {
                const obj = (({ pass, ...o }) => o) (user);
                return { message: "Login exitoso!", data: obj};
            } else {
                throw new BadRequestException(new MessageDto('Usuario o contraseña no válidos'));
            }
        } else {
            throw new NotFoundException(new MessageDto('No existe el usuario'));
        }
    }
}
