import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}

class UpdateStatusTodoDto {
  @IsBoolean()
  isDone: boolean;
}

export { CreateTodoDto, UpdateStatusTodoDto };
