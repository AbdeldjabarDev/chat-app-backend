import 'reflect-metadata'
import { NestFactory, Reflector, SerializedGraph } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,ClassSerializerInterceptor } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import * as fs from 'fs'
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    snapshot : true
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useWebSocketAdapter(new WsAdapter())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({origin : '*'});
  // fs.writeFileSync('./no_files_module_graph.json',JSON.stringify(app.get(SerializedGraph)))
  // console.log();
  
  await app.listen(3000);
}
bootstrap();
