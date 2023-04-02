import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { UserModule } from './user.module';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/users.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService],
})
export class AuthModule { }