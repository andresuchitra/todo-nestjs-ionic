import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './todos.entity';
import { CreateTodoDto } from './dto/todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos) private readonly repo: Repository<Todos>,
  ) {}

  create(todo: CreateTodoDto) {
    const newTodo = this.repo.create(todo);
    newTodo.isDone = false;
    return this.repo.save(newTodo);
  }

  findAll() {
    return this.repo.find();
  }

  async findByID(id: number) {
    const todo = await this.repo.findOneBy({ id });
    return todo;
  }

  async setStatus(id: number, newStatus: boolean) {
    console.log('new: ', newStatus);
    const todo = await this.repo.findOneBy({ id });
    if (todo) {
      console.log('old: ', todo.isDone);
      todo.isDone = newStatus;
      return this.repo.save(todo);
    }

    throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    const toDelete = await this.repo.findOneBy({ id });
    if (!toDelete)
      throw new NotFoundException(`Cannot delete. ID={${id}} is not found`);

    return this.repo.delete({ id });
  }
}
