import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(pass , user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.email, sub: user.id };
    delete user.password
    return {
      access_token: await this.jwtService.signAsync(payload),
      user
    };
  }

}
