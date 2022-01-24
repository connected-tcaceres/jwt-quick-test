import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    console.log('login - req.user:', req.user);
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    console.log('profile - req.user:', req.user);
    return req.user;
  }
}
