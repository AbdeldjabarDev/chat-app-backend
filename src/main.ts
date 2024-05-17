import 'reflect-metadata'
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,ClassSerializerInterceptor } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useWebSocketAdapter(new WsAdapter())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({origin : '*'});
  await app.listen(3000);
}
bootstrap();
