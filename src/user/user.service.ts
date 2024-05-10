import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { ResponseHandler } from 'src/common/response.handler';
import { ConstantsMessages } from 'src/config/constants.messages';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    private responseHandler: ResponseHandler,
  ) {}

  async performLogin(dto: UserDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user || dto.password !== user.pass) {
      return this.responseHandler.handleFailure(
        ConstantsMessages.UNAUTHORIZED_LOGIN,
        HttpStatus.UNAUTHORIZED,
        UnauthorizedException,
      );
    }
    const userWithoutPassword = Object.assign({}, user);
    delete userWithoutPassword.pass;

    return this.responseHandler.handleSuccess(
      ConstantsMessages.STATUS_OK,
      HttpStatus.OK,
      userWithoutPassword,
    );
  }
}
