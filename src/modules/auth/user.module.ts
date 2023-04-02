import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserService } from 'src/services/users.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
