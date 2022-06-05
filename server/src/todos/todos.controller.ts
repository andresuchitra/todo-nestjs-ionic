import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTodoDto, UpdateStatusTodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  getTodos() {
    return this.todoService.findAll();
  }

  @Get('/:id')
  async getTodoByID(@Param('id') id: string) {
    const tID = parseInt(id, 10);

    if (!Number.isInteger(id)) {
      throw new HttpException('ID must be integer', HttpStatus.BAD_REQUEST);
    }

    const todo = await this.todoService.findByID(tID);
    if (!todo)
      throw new HttpException('ID Todo not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Patch('/:id')
  async updateTodo(@Param('id') paramId, @Body() body: any) {
    const isDone = body.isDone;
    console.log('isdone ', typeof isDone === 'boolean');

    if (isDone == undefined || isDone == null)
      throw new HttpException(
        'param isDone must be set true or false',
        HttpStatus.BAD_REQUEST,
      );
    return await this.todoService.setStatus(paramId, isDone);
  }

  @Delete('/:id')
  deleteTodoByID(@Param('id') id: string) {
    const tID = parseInt(id, 10);

    if (tID == null) {
      throw new HttpException('ID must be integer', HttpStatus.BAD_REQUEST);
    }

    return this.todoService.delete(tID);
  }
}
