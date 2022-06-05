import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMError, QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let message: string = (exception as TypeORMError).message;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        break;
      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      default:
        message = 'Please try again';
        break;
    }
    const customResponse = {
      status,
      message,
    };

    response.status(customResponse.status).json(customResponse);
  }
}
