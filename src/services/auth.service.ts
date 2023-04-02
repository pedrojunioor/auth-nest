import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './users.service';


@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

}