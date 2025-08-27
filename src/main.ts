import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Livros')
    .setDescription('Documentação da API de Livros')
    .setVersion('1.0')
        .addTag('users') // Tag opcional para categorizar as rotas
        .addBearerAuth({ //Esquema JWT Bearer
          type:'http',
          scheme:'bearer',
          bearerFormat:'JWT',
          name:'Authorization',
          in:'header'
        })
        .build() // Construir a configuração

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

       app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Remova propriedades não decoradas no DTO
        forbidNonWhitelisted: true, /* Retorna erro se
        enviar propriedades não permitidas*/
        transform: true, // Transforma os tipos automaticamente
        // EX:(string -> number)
      })
    )
    
  await app.listen(process.env.API_PORT2 || 3001);
}
bootstrap();
