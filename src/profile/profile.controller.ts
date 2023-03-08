import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('profile')
export class ProfileController {

    // @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT')
    @UseGuards(JwtAuthGuard)
    @Get()
    profile(){
        console.log('test');
        
        return {result:"i am protected route"}
    }
}
