import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        ) {}

    async validateUser(email: string, password: string): Promise<any> {
      const user = await this.usersService.findByEmail(email);
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}