import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    // async login(@Request() req:any){
    //     return req.user;
    // }
    async login(@Body() createAuthDto: CreateAuthDto){
        return this.authService.login(createAuthDto)
    }
}
