
import { Module } from '@nestjs/common';
import { BookModule } from './books/book.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [BookModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}