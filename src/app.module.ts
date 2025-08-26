
import { Module } from '@nestjs/common';
import { BookModule } from './books/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/users.module';
@Module({
  imports: [BookModule, UserModule ,PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}