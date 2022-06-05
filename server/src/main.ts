import { NestFactory } from '@nestjs/core';
import { TypeOrmFilter } from './todos/todos.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new TypeOrmFilter());
  await app.listen(3000);
}
bootstrap();
