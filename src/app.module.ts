import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/users.service';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';


@Module({
  imports: [
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    UserService,
  ],
})
export class AppModule {}
