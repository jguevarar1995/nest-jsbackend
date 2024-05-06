import { HttpException, Injectable } from '@nestjs/common';
import { MessageDto } from './message.dto';

@Injectable()
export class ResponseHandler {
  handleSuccess(message: string, status: number, data?: any) {
    return { message, status, data };
  }

  handleFailure(
    message: string,
    status: number,
    exceptionType: any = HttpException,
  ) {
    throw new exceptionType(new MessageDto(message), status);
  }
}
