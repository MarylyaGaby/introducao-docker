import { Module } from '@nestjs/common';
import { BookModule } from './Book/livro.module';
import { PrismaModule } from './prisma/prisma.module';
import { LivroModule } from './Book/livro.module';
@Module({
  imports: [LivroModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}