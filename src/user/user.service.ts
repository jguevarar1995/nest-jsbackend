import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { ResponseHandler } from 'src/common/response.handler';
import { ConstantsMessages } from 'src/config/constants.messages';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly responseHandler: ResponseHandler,
  ) {}

  async performLogin(dto: UserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(dto.email);
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
