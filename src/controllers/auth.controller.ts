import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async signIn(@Body() body: any) {
    const { email, password } = body
    return await this.authService.signIn(email, password);
  }
}